from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Contact, PermitRequest, UserProfile
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


class RegistrationSerializer(serializers.ModelSerializer):

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User  # This uses a specified model named User that was provided by Django
        fields = ('first_name', 'last_name', 'email',
                  'username', 'password')

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
        user_profile_data = validated_data.pop('user_profile', {})
        user = User.objects.create_user(**validated_data)

        userid = self.context.get('userid', None)
        if userid:
            user_profile_data['zoho_id'] = userid
        UserProfile.objects.create(user=user, **user_profile_data)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('zoho_id',)


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class PermitRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermitRequest
        fields = ['department', 'form', 'file', 'date_submitted', 'status']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
