from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,DestroyAPIView,UpdateAPIView,RetrieveAPIView,ListAPIView
from .models import Expenses
from .serializers import ExpanseSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

# Recipet class views 


# Category class views 


# Expanse class views 
class ExpanseCreate(ListCreateAPIView):
   queryset = Expenses.objects.all()
   serializer_class = ExpanseSerializer

class ExpanseDelete(DestroyAPIView):
   queryset = Expenses.objects.all()
   serializer_class = ExpanseSerializer

class ExpanseUpdate(UpdateAPIView):
   queryset = Expenses.objects.all()
   serializer_class = ExpanseSerializer

class ExpanseList(ListAPIView):
   queryset = Expenses.objects.all()
   serializer_class = ExpanseSerializer

class ExpanseDetails(RetrieveAPIView):
   queryset = Expenses.objects.all()
   serializer_class = ExpanseSerializer