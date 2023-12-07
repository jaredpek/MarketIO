from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')),
    path('api/analytics/', include('analytics.urls')),
    path('api/users/', include('user_account.urls')),
]
