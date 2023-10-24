from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Contact, PermitRequest
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

class RegistrationSerializer(serializers.ModelSerializer):

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User  #This uses a specified model named User that was provided by Django
        fields = ('first_name', 'last_name', 'email', 'username', 'password')

    def validate(self, args):
        email = args.get('email', None)
        username = args.get('username', None)
        password = args.get('password', None)

        try: 
            validate_password(password)
        except ValidationError as e:
            raise serializers.ValidationError(str(e))

        return super().validate(args)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class ContactSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Contact
        fields = '__all__'

class PermitRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermitRequest
        fields = '__all__'