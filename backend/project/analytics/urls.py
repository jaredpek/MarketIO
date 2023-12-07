from django.urls import path
from analytics.views import Analytics

urlpatterns = [
    path('compute/', Analytics.as_view()),
]