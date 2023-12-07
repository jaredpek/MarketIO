from django.urls import path
from analytics.views import Analytics

urlpatterns = [
    path('', Analytics.as_view()),
]