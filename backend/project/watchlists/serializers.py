from rest_framework import serializers
from watchlists.models import WatchlistItem
from django.contrib.auth.models import User
from products.models import Product
from products.serializers import ProductSerializer

class WatchlistItemViewSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    key = serializers.CharField(source='product.key', read_only=True)
    title = serializers.CharField(source='product.title', read_only=True)
    url = serializers.CharField(source='product.url', read_only=True)
    image = serializers.CharField(source='product.image', read_only=True)
    currency = serializers.CharField(source='product.currency', read_only=True)
    price = serializers.FloatField(source='product.price', read_only=True)
    rating = serializers.FloatField(source='product.rating', read_only=True)
    rating_qty = serializers.IntegerField(source='product.rating_qty', read_only=True)
    platform = serializers.CharField(source='product.platform', read_only=True)
    
    class Meta:
        model = WatchlistItem
        fields = ['id', 'user', 'key', 'title', 'url', 'image', 'currency', 'price', 'rating', 'rating_qty', 'platform']

class WatchlistItemAddSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    key = serializers.CharField(source='product.key', required=True)
    title = serializers.CharField(source='product.title', required=True)
    url = serializers.CharField(source='product.url', required=True)
    image = serializers.CharField(source='product.image', required=True)
    currency = serializers.CharField(source='product.currency', required=True)
    price = serializers.FloatField(source='product.price', required=True)
    rating = serializers.FloatField(source='product.rating', required=True)
    rating_qty = serializers.IntegerField(source='product.rating_qty', required=True)
    platform = serializers.CharField(source='product.platform', required=True)

    def get_product(self, product_data):
        try:
            product = Product.objects.get(key=product_data.get('key'))
        except Exception:
            product_serializer = ProductSerializer(data=product_data)
            product = product_serializer.create(product_data)
        return product

    def create(self, validated_data):
        product_data = validated_data.copy()
        product_data.pop('user')
        product = self.get_product(product_data)
        user = User.objects.get(pk=validated_data.get('user'))
        return super().create({
            'user': user,
            'product': product,
        })

    class Meta:
        model = WatchlistItem
        fields = ['user', 'key', 'title', 'url', 'image', 'currency', 'price', 'rating', 'rating_qty', 'platform']
