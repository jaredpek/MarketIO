from rest_framework import serializers
from watchlists.models import WatchlistItem

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
        fields = ['user', 'key', 'title', 'url', 'image', 'currency', 'price', 'rating', 'rating_qty', 'platform']

class WatchlistItemAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchlistItem
        fields = ['user', 'product']
