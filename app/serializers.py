from rest_framework import serializers
from .models import Expenses
# from .models import Recipet,Category,Expanse
from .models import Recipet
from .models import Category
from auth_app.serializers import UserSerializer

# Recipet class serializer 
class RecipetSerializer(serializers.ModelSerializer):    
    # creator = serializers.ReadOnlyField(source='creator.username')
    # creator_id = serializers.ReadOnlyField(source='creator.id')
    # Image = serializers.ImageField(required=False)

    class Meta:
        model = Recipet
        fields = ['id', 'PlaceName', 'Amount', 'Categoty', 'Image','owner']

# Category class serializer 
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    def get_categories_user(self, obj,request):
        categories = Category.objects.filter(owner_id=request.user.id)
        return categories
class PopulateCategorySerializer(CategorySerializer):
    Categoty=CategorySerializer()    

# Expanse class serializer 
class ExpanseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expenses
        fields = '__all__'

    def get_Expanse_user(self,obj,request):
        expenses = Expenses.objects.filter(owner_id= request.user.id)
        return expenses


class PopulateRecipetSerializer(RecipetSerializer):
    Categoty=CategorySerializer()
    #owner=UserSerializer()

class PopulateExpanseSerilizer(ExpanseSerializer):
    owner = UserSerializer()
    Category= CategorySerializer()
    # Recipet = RecipetSerializer()