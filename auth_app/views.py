from django.shortcuts import render
#Calling the Views
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView,LogoutView
from rest_framework.generics import ListAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView
#Permissions and Authentications
from rest_framework.permissions import IsAuthenticated #check a request is the token valid or not
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
#Model and Serializer
from .models import User
from .serializers import UserSerializer

# Create your views here.
#1. User Registeration View (not used)
class UserRegisterView(RegisterView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
# #2. User Login View (not used)
class UserLoginView(LoginView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

#3. User Logout View
class UserLogoutView(LogoutView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
#4. Retrieving all users for admin only
class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

#5. Destroying an account in case the user  no longer wants an account 
class UserDestroyView(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

#6. Retrieving the profile of one signed in user
class UserRetrieveView(ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    def get_queryset(self):
        print('self.request.user: ',self.request.user.id)
        return User.objects.filter(id=self.request.user.id)
    serializer_class = UserSerializer

#7. Retrieving one profile for admin
class UserRetrieveOneView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = User.objects.all()
    serializer_class = UserSerializer

#8. Updating the profile of one signed in user
class UserUpdateView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

#creating our own view
from rest_framework.views import APIView
class MyView(APIView):
    def post(self):
        pass

    def get(self):
        pass
