from django.urls import path
from watchlists.views import GetView, AddView, RemoveView

urlpatterns = [
    path('', GetView.as_view()),
    path('add/', AddView.as_view()),
    path('remove/', RemoveView.as_view()),
]
