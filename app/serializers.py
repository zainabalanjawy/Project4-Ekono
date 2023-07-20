from rest_framework import serializers
# from .models import Recipet,Category,Expanse
from .models import Category

# Recipet class serializer 
# class RecipetSerializer(serializers.ModelSerializer):


# Category class serializer 
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


# Expanse class serializer 
# class ExpanseSerializer(serializers.ModelSerializer):
