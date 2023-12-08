from django.db import models
from django.core.validators import MinValueValidator, MaxLengthValidator

class Product(models.Model):
    key = models.CharField(max_length=50, validators=[MaxLengthValidator(50, message='"key" must have a maximum of 50 characters')], unique=True, blank=False, null=False)
    title = models.CharField(max_length=500, validators=[MaxLengthValidator(500, message='"title" must have a maximum of 500 characters')], blank=False, null=False)
    url = models.CharField(max_length=1000, validators=[MaxLengthValidator(1000, message='"url" must have a maximum of 1000 characters')], unique=True, blank=False, null=False)
    image = models.CharField(max_length=500, validators=[MaxLengthValidator(500, message='"image" must have a maximum of 500 characters')], blank=False, null=False)
    currency = models.CharField(max_length=5, validators=[MaxLengthValidator(5, message='"currency" must have a maximum of 5 characters')], blank=False, null=False)
    price = models.FloatField(validators=[MinValueValidator(0, '"price" must be a number larger than 0')], blank=False, null=False)
    rating = models.FloatField(validators=[MinValueValidator(0, '"rating" must be a number of at least 0')], blank=False, null=False)
    rating_qty = models.IntegerField(validators=[MinValueValidator(0, '"rating_qty" must be an integer of at least 0')], blank=False, null=False)
    platform = models.CharField(max_length=30, validators=[MaxLengthValidator(30, message='"platform" must have a maximum of 30 characters')], blank=False, null=False)

    def __str__(self):
        return f'{self.key} | {self.title} | {self.platform}'
