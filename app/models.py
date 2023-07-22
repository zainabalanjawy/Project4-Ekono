from django.db import models
# from auth_app.models import User


# Recipet class model 
# class Recipet(models.Model):


# Category class model 
class Category(models.Model):
     Category_name = models.CharField(max_length=30)
     Description = models.CharField(max_length=30)
     Emojis = models.CharField(max_length=30)

# def __str__(self):
#      return f'{self.Category_name}{self.Description}{self.Emojis}