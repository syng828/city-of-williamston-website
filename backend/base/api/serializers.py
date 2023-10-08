from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Contact


class RegistrationSerializer(serializers.ModelSerializer):

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User  #This uses a specified model named User that was provided by Django
        fields = ('first_name', 'last_name', 'email', 'username', 'password')

    def validate(self, args):
        email = args.get('email', None)
        username = args.get('username', None)
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {'email': ('email already exists')})
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError(
                {'username': ('username already exists')})

        return super().validate(args)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class ContactSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Contact
        fields = '__all__'
