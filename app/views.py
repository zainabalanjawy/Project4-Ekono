from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,DestroyAPIView,UpdateAPIView,RetrieveAPIView,ListAPIView
# from .models import Recipet,Category,Expanse
from .models import Category
# from .serializers import RecipetSerializer,CategorySerializer,ExpanseSerializer
from .serializers import CategorySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from .models import Recipet
from .serializers import RecipetSerializer
from rest_framework.parsers import MultiPartParser, FormParser

# Recipet class views
class RecipetCreate(ListCreateAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Recipet.objects.all()
    serializer_class = RecipetSerializer
    parser_classes = (MultiPartParser, FormParser)
    def perform_create(self, serializer):
        # serializer.save(creator=self.request.user)
        serializer.save()
    

class RecipetDelete(DestroyAPIView):
        queryset = Recipet.objects.all()
        serializer_class = RecipetSerializer


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