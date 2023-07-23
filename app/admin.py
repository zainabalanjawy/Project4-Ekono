from django.contrib import admin
from .models import Expenses,Recipet,Category

# Register your models here.
admin.site.register(Recipet)
admin.site.register(Category)
admin.site.register(Expenses)
