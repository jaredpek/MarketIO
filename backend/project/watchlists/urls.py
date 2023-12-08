from django.urls import path
from watchlists.views import WatchlistView

urlpatterns = [
    path('', WatchlistView.as_view())
]
