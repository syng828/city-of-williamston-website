from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegistrationSerializer, ContactSerializer, PermitRequestSerializer
from ..models import PermitRequest
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
                data = response.json()
                # issue, the id is auto generated so instead should probably store it somewhere so can call it again for the record id.
                userid = data.get('id')
                user = serializer.save()
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
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            file = request.data['file']  # how to get??
            # make record id dynamic later
            external_api_url = "https://www.zohoapis.com/crm/v2/Contacts/5989550000000487002/Attachments"
            payload = {
                "data": [
                    {
                        "file": file
                    }
                ]
            }
            headers = {
                "Authorization": f'Zoho-oauthToken {ACCESS_TOKEN}',
            }
            try:
                response = requests.post(
                    external_api_url, json=payload, headers=headers)
                response.raise_for_status()  # Raise an error for non-2xx response codes
                data = response.json()
                serializer.save()
                return Response({'message': 'Permit Submission and file upload call successful'}, status=status.HTTP_201_CREATED)
            except requests.exceptions.RequestException as e:
                return Response({'error': 'File API request failed', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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
