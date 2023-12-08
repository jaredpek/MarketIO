from rest_framework import serializers
from django.contrib.auth.models import User
from profiles.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['mobile_number']

class UserSerializer(serializers.ModelSerializer):
    mobile_number = serializers.CharField(source='profile.mobile_number', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'mobile_number', 'date_joined']
        read_only_fields = ['id', 'username', 'date_joined']
