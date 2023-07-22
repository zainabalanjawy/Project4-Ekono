from django.db import models
# from auth_app.models import User

# lets us explicitly set upload path and filename
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

# Recipet class model 
class Recipet(models.Model):
    PlaceName = models.CharField(max_length=30)
    Amount = models.FloatField(max_length=10)
    Categoty = models.CharField(max_length=30)
    Image= models.ImageField(upload_to=upload_to, blank=True, null=True)

    def __str__(self):
        return f'{self.Categoty} : {self.PlaceName}'



# Category class model 
# class Category(models.Model):


# Expanse class model 
# class Expanse(models.Model):
