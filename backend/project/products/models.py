from django.db import models
from django.core.validators import MinValueValidator

class Product(models.Model):
    key = models.CharField(max_length=50, error_messages='"key" must be a string not longer than 50 characters', unique=True, blank=False, null=False)
    title = models.CharField(max_length=500, error_messages='"title" must be a string not longer than 500 characters', blank=False, null=False)
    url = models.CharField(max_length=1000, error_messages='"url" must be a string not longer than 1000 characters', unique=True, blank=False, null=False)
    image = models.CharField(max_length=500, error_messages='"image" must be a string not longer than 500 characters', blank=False, null=False)
    currency = models.CharField(max_length=5, error_messages='"currency" must be a string not longer than 5 characters', blank=False, null=False)
    price = models.FloatField(validators=[MinValueValidator(0, '"price" must be a number larger than 0')], blank=False, null=False)
    rating = models.FloatField(validators=[MinValueValidator(0, '"rating" must be a number of at least 0')], blank=False, null=False)
    rating_qty = models.IntegerField(validators=[MinValueValidator(0, '"rating_qty" must be an integer of at least 0')], blank=False, null=False)
    platform = models.CharField(max_length=30, error_messages='"platform" must be a string not longer than 30 characters', blank=False, null=False)

    def __str__(self):
        return f'{self.pk} | {self.key} | {self.title} | {self.platform}'
