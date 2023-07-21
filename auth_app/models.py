
from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    first_name = models.CharField(max_length=200, blank=True, default='user')
    last_name = models.CharField(max_length=200, blank=True, default='user')
    email = models.CharField(max_length=200, blank=True, default='user@email.com')
    address = models.CharField(max_length=200, blank=True, default='unknown')
    budget = models.FloatField(blank=True, default=0.00)
