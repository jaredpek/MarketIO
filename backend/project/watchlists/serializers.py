from rest_framework import serializers
from watchlists.models import WatchlistItem
from django.contrib.auth.models import User
from products.models import Product

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
    def get_product(self, key):
        try:
            return Product.objects.get(key=key)
        except:
            return None
    
    def is_valid(self, *, raise_exception=False):
        product = self.get_product(key=self.initial_data.get('product'))
        self.initial_data.update({'product': product.id if product else -1})
        return super().is_valid(raise_exception=raise_exception)
    
    def create(self, validated_data):
        validated_data.update({
            'user': User.objects.get(pk=validated_data.get('user')),
            'product': Product.objects.get(pk=validated_data.get('product')),
        })
        return super().create(validated_data)
    
    class Meta:
        model = WatchlistItem
        fields = ['user', 'product']
