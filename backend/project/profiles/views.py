from datetime import datetime, timedelta
from django.contrib.auth.models import User
from project.response import Response as Result
from profiles.serializers import UserSerializer, ProfileSerializer

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from dj_rest_auth.views import LoginView
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.registration.serializers import RegisterSerializer

from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

LIFETIME = 30

def convertDate(date) :
    return int(date.timestamp() * 1000)

def getLifetime(lifetime=LIFETIME):
    today = datetime.now()
    expiry = today + timedelta(days=lifetime)
    return {
        "created": convertDate(today),
        "expires": convertDate(expiry)
    } 

class CredentialLoginView(LoginView):
    def post(self, request, *args, **kwargs):
        result = Result()
        result_data = result.result
        
        try:
            data = super().post(request, *args, **kwargs).data
            result.set_message('login', result.get_message('success'))
            result_data['data']['access'] = data.get('access') or ''
            result_data['data']['refresh'] = data.get('refresh') or ''
            result_data['data']['created'] = datetime.now()
            result_data['data'].update(getLifetime())
            return Response(result_data, status.HTTP_200_OK)
        except Exception:
            result.set_error('login', 'invalid "username" or "password" provided')
            return Response(result_data, status.HTTP_400_BAD_REQUEST)

class CredentialRegisterView(RegisterView):
    def post(self, request, *args, **kwargs):
        result = Result()
        result_data = result.result
        register_serializer = RegisterSerializer(data=request.data)

        if not register_serializer.is_valid():
            errors = register_serializer.errors
            for field in errors:
                result.set_error(field, errors[field], many=True)
            return Response(result_data, status.HTTP_400_BAD_REQUEST)
            
        try:
            data = super().post(request, *args, **kwargs)
            result.set_message('registration', result.get_message('success'))
            return Response(result_data, status.HTTP_200_OK)
        except Exception:
            result.set_error('registration', result.get_message('success'))
            return Response(result_data, status.HTTP_400_BAD_REQUEST)

class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://127.0.0.1:3000/"
    client_class = OAuth2Client

    def post(self, request, *args, **kwargs):
        result = Result()
        result_data = result.result

        try:
            data = super().post(request, *args, **kwargs).data
            result.set_message('login', result.get_message('success'))
            result_data['data']['access'] = data.get('access') or ''
            result_data['data']['refresh'] = data.get('refresh') or ''
            result_data['data'].update(getLifetime())
            return Response(result_data, status.HTTP_200_OK)
        except Exception:
            result.set_error('login', 'invalid "username" or "password" provided')
            return Response(result_data, status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    queryset = User.objects.all()
    
    def get(self, request):
        result = Result()
        result_data = result.result
        
        try:
            user = self.queryset.get(id=request.user.id)
            result_data['data'] = UserSerializer(user).data
            return Response(result_data, status.HTTP_200_OK)
        except Exception:
            result.set_error('user', result.get_message('does_not_exist'))
            return Response(result_data, status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        result = Result()
        result_data = result.result
        
        user_serializer = UserSerializer(request.user, request.data)
        profile_serializer = ProfileSerializer(request.user.profile, request.data)

        if not user_serializer.is_valid() or not profile_serializer.is_valid():
            for serializer in [user_serializer, profile_serializer]:
                errors = serializer.errors
                for field in errors:
                    result.set_error(field, errors[field], many=True)
            return Response(result_data, status.HTTP_400_BAD_REQUEST)
        
        user_serializer.save()
        profile_serializer.save()
        result.set_message('update', result.get_message('success'))
        return Response(result_data, status.HTTP_200_OK)
