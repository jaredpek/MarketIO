from django.urls import path
from profiles.views import LoginView, RegisterView, ProfileView

urlpatterns = [
    path('profile/', ProfileView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('auth/register/', RegisterView.as_view()),
]
