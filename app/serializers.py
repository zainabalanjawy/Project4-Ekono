from rest_framework import serializers
from .models import Expenses
# from .models import Recipet,Category,Expanse

# Recipet class serializer 
# class RecipetSerializer(serializers.ModelSerializer):


# Category class serializer 
# class CategorySerializer(serializers.ModelSerializer):


# Expanse class serializer 
class ExpanseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expenses
        fields = '__all__'
