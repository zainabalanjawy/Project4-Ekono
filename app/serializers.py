from rest_framework import serializers
# from .models import Recipet,Category,Expanse
from .models import Recipet
from .models import Category

# Recipet class serializer 
class RecipetSerializer(serializers.ModelSerializer):    
    # creator = serializers.ReadOnlyField(source='creator.username')
    # creator_id = serializers.ReadOnlyField(source='creator.id')
    # Image = serializers.ImageField(required=False)

    class Meta:
        model = Recipet
        fields = ['id', 'PlaceName', 'Amount', 'Categoty', 'Image']



# Category class serializer 
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


# Expanse class serializer 
# class ExpanseSerializer(serializers.ModelSerializer):
