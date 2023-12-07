from rest_framework import serializers
from products.models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['user', 'key', 'title', 'url', 'image', 'currency', 'price', 'rating', 'rating_qty', 'platform']
