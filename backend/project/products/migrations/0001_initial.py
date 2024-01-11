# Generated by Django 4.2.1 on 2024-01-11 10:19

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=50, unique=True, validators=[django.core.validators.MaxLengthValidator(50, message='"key" must have a maximum of 50 characters')])),
                ('title', models.CharField(max_length=500, validators=[django.core.validators.MaxLengthValidator(500, message='"title" must have a maximum of 500 characters')])),
                ('url', models.CharField(max_length=1000, unique=True, validators=[django.core.validators.MaxLengthValidator(1000, message='"url" must have a maximum of 1000 characters')])),
                ('image', models.CharField(max_length=500, validators=[django.core.validators.MaxLengthValidator(500, message='"image" must have a maximum of 500 characters')])),
                ('currency', models.CharField(max_length=5, validators=[django.core.validators.MaxLengthValidator(5, message='"currency" must have a maximum of 5 characters')])),
                ('price', models.FloatField(validators=[django.core.validators.MinValueValidator(0, '"price" must be a number larger than 0')])),
                ('rating', models.FloatField(validators=[django.core.validators.MinValueValidator(0, '"rating" must be a number of at least 0')])),
                ('rating_qty', models.IntegerField(validators=[django.core.validators.MinValueValidator(0, '"rating_qty" must be an integer of at least 0')])),
                ('platform', models.CharField(max_length=30, validators=[django.core.validators.MaxLengthValidator(30, message='"platform" must have a maximum of 30 characters')])),
            ],
        ),
    ]
