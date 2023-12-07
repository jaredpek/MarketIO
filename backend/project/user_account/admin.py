from django.contrib import admin
from user_account.models import Profile

admin.site.register([
    Profile,
])
