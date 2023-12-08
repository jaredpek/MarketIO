from django.contrib.auth.models import User
from project.response import Response as Result
from profiles.serializers import UserSerializer, ProfileSerializer

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from dj_rest_auth.views import LoginView as BaseLoginView
from dj_rest_auth.registration.views import RegisterView as BaseRegisterView
from dj_rest_auth.registration.serializers import RegisterSerializer

class LoginView(BaseLoginView):
    def post(self, request, *args, **kwargs):
        result = Result()
        result_data = result.result
        
        try:
            data = super().post(request, *args, **kwargs).data
            result.set_message('login', result.messages['success'])
            result_data['data']['key'] = data.get('key') or ''
            return Response(result_data, status.HTTP_200_OK)
        except Exception:
            result.set_error('login', 'invalid "username" or "password" provided')
            return Response(result_data, status.HTTP_400_BAD_REQUEST)

class RegisterView(BaseRegisterView):
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
            result.set_message('registration', result.messages['success'])
            return Response(result_data, status.HTTP_200_OK)
        except Exception:
            result.set_error('registration', result.messages['success'])
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
            result.set_error('user', result.messages['does_not_exist'])
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
        result.set_message('update', result.messages['success'])
        return Response(result_data, status.HTTP_200_OK)
