from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/analytics/', include('analytics.urls')),
    path('api/products/', include('products.urls')),
    path('api/search/', include('search.urls')),
    path('api/users/', include('profiles.urls')),
    path('api/watchlists/', include('watchlists.urls')),
]
