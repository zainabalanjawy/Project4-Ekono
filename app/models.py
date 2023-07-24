from django.db import models 
from auth_app.models import User

# lets us explicitly set upload path and filename
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

# Category class model 
class Category(models.Model):
    Category_name = models.CharField(max_length=30)
    Description = models.CharField(max_length=30)
    Emojis = models.CharField(max_length=30)
    owner= models.ForeignKey(User,related_name="users",on_delete=models.CASCADE)
    def __str__(self):
        return f'{self.Category_name}'
  
# Recipet class model 
class Recipet(models.Model):
    PlaceName = models.CharField(max_length=30)
    Amount = models.FloatField(max_length=10)
    Categoty = models.ForeignKey(Category,related_name="category",on_delete=models.CASCADE)
    Image= models.ImageField(upload_to=upload_to, blank=True, null=True)
    owner = models.ForeignKey(User,related_name="user",on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.Categoty} : {self.PlaceName}'
    


# Expanse class model 
class Expenses(models.Model):

    PlaceName = models.CharField(max_length=20)
    Items = models.CharField(max_length=200)
    Amount = models.FloatField(max_length=15)
    owner = models.ForeignKey(User, related_name='User', on_delete=models.CASCADE)
    Category=models.ForeignKey(Category, related_name='Category',on_delete=models.CASCADE, blank=True, null=True)
    recipet = models.ForeignKey(Recipet,related_name='Recipt', on_delete=models.CASCADE,blank=True, null=True)
    Date = models.DateField(auto_now=True)

    def __str__(self):
        return f'{self.Items} from {self.PlaceName}'