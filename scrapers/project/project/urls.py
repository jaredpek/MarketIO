from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')),
    path('api/categories/', include('categories.urls')),
    path('api/analytics/', include('analytics.urls')),
]
