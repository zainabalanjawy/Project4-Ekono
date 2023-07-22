from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,DestroyAPIView,UpdateAPIView,RetrieveAPIView,ListAPIView
# from .models import Recipet,Category,Expanse
from .models import Category
# from .serializers import RecipetSerializer,CategorySerializer,ExpanseSerializer
from .serializers import CategorySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

# Recipet class views 


# Category class views 
class CategoryCreate(ListCreateAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDelete(DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryUpdate(UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

   



# Expanse class views 