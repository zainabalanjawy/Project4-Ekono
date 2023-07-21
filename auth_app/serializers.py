from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers
from .models import User

class UserSerializer(RegisterSerializer, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", 'email', 'address',
                  'budget', 'password1', 'password2')

    # def custom_signup(self, request: Request, user: User) -> None:
    #     for f in self.Meta.fields:
    #         if hasattr(user, f) and not getattr(user, f):
    #             setattr(user, f, self.initial_data[f])

    #     user.save()