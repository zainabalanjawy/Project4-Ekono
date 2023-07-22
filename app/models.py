from django.db import models 
# from auth_app.models import User


# Recipet class model 
# class Recipet(models.Model):


# Category class model 
# class Category(models.Model):


# Expanse class model 
class Expenses(models.Model):
    PlaceName = models.CharField(max_length=20)
    Items = models.CharField(max_length=200)
    Catogries = models.CharField(max_length=20)
    Amount = models.FloatField(max_length=15)

    def __str__(self):
        return self.PlaceName