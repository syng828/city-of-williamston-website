from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView

from rest_framework.parsers import FileUploadParser
from django.core.files.uploadedfile import SimpleUploadedFile

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegistrationSerializer, ContactSerializer, PermitRequestSerializer
from ..models import PermitRequest, UserProfile
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.core.mail import send_mail
import requests
from decouple import config

# Create your views here.

ACCESS_TOKEN = config('ACCESS_TOKEN')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...
        try:
            user_profile = user.user_profile
            zoho_id = user_profile.zoho_id
            token['zoho_id'] = zoho_id
        except UserProfile.DoesNotExist:
            pass

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# call the zoho crm api as well to create a new contact


class RegistrationAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            firstName = request.data['first_name']
            lastName = request.data['last_name']
            email = request.data['email']

            external_api_url = "https://www.zohoapis.com/crm/v2/Contacts"
            payload = {
                "data": [
                    {
                        "Owner": {
                            "id": "5989550000000438001"  # stephanie's id, possible to switch with another account
                        },
                        "Email": email,
                        "First_Name": firstName,
                        "Last_Name": lastName
                    }
                ]
            }
            headers = {
                "Authorization": f'Zoho-oauthToken {ACCESS_TOKEN}',
                "Content-Type": "application/json"
            }
            try:
                response = requests.post(
                    external_api_url, json=payload, headers=headers)
                response.raise_for_status()  # Raise an error for non-2xx response codes
                dataRes = response.json()
                # path of grabbing the id
                userid = dataRes["data"][0]["details"]["id"]
                serializer.context['userid'] = userid
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response({'message': 'Registration and API call successful'}, status=status.HTTP_201_CREATED)
            except requests.exceptions.RequestException as e:
                return Response({'error': 'API request failed', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ContactSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            department = request.data['department']
            name = request.data['name']
            email = request.data['email']
            content = request.data['content']

            subject = f'Contact Form Submission - {department}'
            send_mail(subject, content + "\n Sent by: " +
                      name, email, ['kimthu21299@gmail.com'])
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@authentication_classes([JWTAuthentication])
class PermitRequestAPIView(generics.CreateAPIView):
    serializer_class = PermitRequestSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = request.user
        user_profile = user.user_profile  # Access the oneToOneField relationship
        zoho_id = user_profile.zoho_id

        department_name = request.POST.get('department')
        form_name = request.POST.get('form')

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            permitObject = serializer.save()
            # Upload tasks for staff when submitting permit
            external_api_url_tasks = "https://www.zohoapis.com/crm/v2/Tasks"
            payload = {

                "data": [
                    {
                        "Owner": {
                            "id": "5989550000000438001"
                        },
                        "Who_Id": {
                            "id": zoho_id
                        },
                        "$se_module": "CONTACTS",
                        "Status": "In Progress",
                        "Description": f"Review the submission tasked for {department_name}",
                        "Priority": "Low",
                        "Subject": f"Review {form_name}"
                    }
                ]

            }
            headers = {
                "Authorization": f'Zoho-oauthToken {ACCESS_TOKEN}',
                "Content-Type": "application/json"
            }
            try:
                response = requests.post(
                    external_api_url_tasks, json=payload, headers=headers)
                response.raise_for_status()  # Raise an error for non-2xx response codes
                dataRes = response.json()
                # path to get taskid
                taskid = dataRes["data"][0]["details"]["id"]
                # upload file attachment to the task
                print(taskid)
                file_path = permitObject.file.path
                file_name = permitObject.file.name

                with open(file_path, 'rb') as file:
                    file_content = file.read()

                external_api_url = f'https://www.zohoapis.com/crm/v2/Tasks/{taskid}/Attachments'
                files = {'file': (file_name, file_content)}
                headers = {'Authorization': f'Zoho-oauthToken {ACCESS_TOKEN}'}

                try:
                    response = requests.post(
                        external_api_url, headers=headers, files=files)
                    response.raise_for_status()  # Raise an error for non-2xx response codes
                    return Response({'message': 'Permit Submission and file upload call successful'}, status=status.HTTP_201_CREATED)
                except requests.exceptions.RequestException as e:
                    return Response({'error': 'File API request failed', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except requests.exceptions.RequestException as e:
                return Response({'error': 'Task API request failed', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_permit_requests(request):
    permit_requests = PermitRequest.objects.filter(
        user=request.user)
    serializer = PermitRequestSerializer(permit_requests, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/register',
        '/api/contact',
        '/api/permit_request/',
        '/api/permit_requests/'
    ]
    return Response(routes)
