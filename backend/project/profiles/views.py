from django.contrib.auth.models import User
from project.response import Response as BaseResponse
from profiles.serializers import UserSerializer, ProfileSerializer

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from dj_rest_auth.views import LoginView as BaseLoginView
from dj_rest_auth.registration.views import RegisterView as BaseRegisterView
from dj_rest_auth.registration.serializers import RegisterSerializer

class LoginView(BaseLoginView, BaseResponse):
    def post(self, request, *args, **kwargs):
        result = self.default.copy()
        try:
            data = super().post(request, *args, **kwargs).data
            self.set_message('credentials', 'user successfully logged in', result)
            self.set_message('key', data.get('key'), result)
            return Response(result, status.HTTP_200_OK)
        except Exception:
            self.set_error('credentials', 'invalid "username" or "password" provided', result)
            return Response(result, status.HTTP_400_BAD_REQUEST)

class RegisterView(BaseRegisterView, BaseResponse):
    def post(self, request, *args, **kwargs):
        result = self.default.copy()
        register_serializer = RegisterSerializer(data=request.data)

        if not register_serializer.is_valid():
            errors = register_serializer.errors
            for field in errors:
                self.set_error(field, errors[field][0], result)
            return Response(result, status.HTTP_400_BAD_REQUEST)
            
        try:
            data = super().post(request, *args, **kwargs)
            self.set_message('credentials', 'user successfully registered', result)
            return Response(result, status.HTTP_200_OK)
        except Exception:
            self.set_error('registration', 'error creating new user', result)
            return Response(result, status.HTTP_400_BAD_REQUEST)

class ProfileView(APIView, BaseResponse):
    queryset = User.objects.all()
    
    def get(self, request):
        result = self.default.copy()
        try:
            user = self.queryset.get(id=request.user.id)
            result['data'] = UserSerializer(user).data
            return Response(result, status.HTTP_200_OK)
        except Exception:
            self.set_error('user', 'user credentials are invalid', result)
            return Response(result, status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        result = self.default.copy()
        user_serializer = UserSerializer(request.user, request.data)
        profile_serializer = ProfileSerializer(request.user.profile, request.data)
        
        if not user_serializer.is_valid() or not profile_serializer.is_valid():
            for serializer in [user_serializer, profile_serializer]:
                errors = serializer.errors
                for field in errors:
                    self.set_error(field, errors[field][0], result)
            return Response(result, status.HTTP_400_BAD_REQUEST)
        
        user_serializer.save()
        profile_serializer.save()
        self.set_message('profile', 'profile updated successfully', result)
        return Response(result, status.HTTP_200_OK)
