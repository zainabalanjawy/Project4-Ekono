from django.shortcuts import render
from requests import request
from rest_framework.generics import ListCreateAPIView,DestroyAPIView,UpdateAPIView,RetrieveAPIView,ListAPIView,CreateAPIView
from .models import Expenses,Category,Recipet
from .serializers import ExpanseSerializer,CategorySerializer,RecipetSerializer,PopulateRecipetSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token


# Recipet class views
class RecipetList(ListAPIView):
   permission_classes = [IsAuthenticated]
   authentication_classes = [TokenAuthentication]
   def get_queryset(self):
    return Recipet.objects.filter(owner_id=self.request.user)
   
   serializer_class = RecipetSerializer



class RecipetCreate(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    parser_classes = (MultiPartParser, FormParser)
   #  queryset = Recipet.objects.all()
   #  serializer_class = RecipetSerializer

    def post(self,request):
        user = request.user
        print ("uid",user.id)
        data=request.data
        data['owner']=user.id
        print(data)
        serializer = RecipetSerializer(data=data)

        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(status=404)
    

class RecipetDelete(DestroyAPIView):
        permission_classes = [IsAuthenticated]
        queryset = Recipet.objects.all()
        serializer_class = RecipetSerializer


# Category class views 
class CategoryCreate(ListCreateAPIView):
    # permission_classes = [IsAuthenticated]
    # queryset = Category.objects.all()
    # serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        user = request.user
        print ("uid",user.id)
        data=request.data
        data['owner']=user.id
        print(data)
        serializer = CategorySerializer(data=data)

        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(status=404)

class CategoryDelete(DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryUpdate(UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryList(ListAPIView):

     permission_classes = [IsAuthenticated]
     authentication_classes = [TokenAuthentication]
     def get_queryset(self):
        return Category.objects.filter(owner_id=self.request.user)
     serializer_class = CategorySerializer
   

class CategoryView(ListAPIView):
   permission_classes = [IsAuthenticated]
   authentication_classes = [TokenAuthentication]
   def get_queryset(self):
    return Category.objects.filter(owner_id=self.request.user)
   serializer_class = CategorySerializer

# Expanse class views 
class ExpanseCreate(ListCreateAPIView):
  
#   
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = Expenses.objects.all()
    serializer_class = ExpanseSerializer

    def post(self,request):
        user = request.user
        print ("uid",user.id)
        data=request.data
        data['owner']=user.id
        print(data)
        serializer = ExpanseSerializer(data=data)

        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(status=404)
    

class ExpanseDelete(DestroyAPIView):
   queryset = Expenses.objects.all()
   serializer_class = ExpanseSerializer

class ExpanseUpdate(UpdateAPIView):
   queryset = Expenses.objects.all()
   serializer_class = ExpanseSerializer

class ExpanseList(ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    def get_queryset(self):
     return Expenses.objects.filter(owner_id=self.request.user)
    serializer_class = ExpanseSerializer
#    queryset = Expenses.objects.all()
#    serializer_class = ExpanseSerializer

class ExpanseDetails(RetrieveAPIView):
   queryset = Expenses.objects.all()
   serializer_class = ExpanseSerializer