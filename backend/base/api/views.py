from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status 
from rest_framework.authentication import TokenAuthentication

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegistrationSerializer, ContactSerializer, PermitRequestSerializer
from ..models import PermitRequest

from django.core.mail import send_mail

# Create your views here.

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


class RegistrationAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

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
            send_mail(subject, content + "\n Sent by: " + name, email, ['kimthu21299@gmail.com']) 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([TokenAuthentication])
class PermitRequestAPIView(generics.CreateAPIView):
    serializer_class = PermitRequestSerializer
    permission_classes = ([IsAuthenticated])

    def perform_create(self, serializer):
        serializer.save(username=self.request.user.username)

@api_view(['GET'])
def get_permit_requests(request):
    permit_requests = PermitRequest.objects.filter(username=request.user.username)
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