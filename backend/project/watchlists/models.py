from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.contrib.auth.models import User
from products.models import Product

class WatchlistItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user', blank=False, null=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product', blank=False, null=False)

    class Meta:
        constraints = [
            UniqueConstraint(fields=['user', 'product'], name='unique_watchlist_item')
        ]

    def __str__(self):
        return f'{self.pk} | {self.user.username} | {self.product.key}'
