from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from .models import User

class UserSerializer(RegisterSerializer, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # fields = ("id", "username", "first_name", "last_name", "address", "budget", "date_joined", "last_login", "password")