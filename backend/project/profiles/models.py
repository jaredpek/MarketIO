from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mobile_number = models.CharField(max_length=20, validators=[RegexValidator('^\+\d{6,20}$', message='"mobile_number" must be in the format "+XXXXXXXX"')], blank=True, null=True)

    def __str__(self):
        return f'{self.pk} | {self.user.username} | {self.mobile_number}'

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
