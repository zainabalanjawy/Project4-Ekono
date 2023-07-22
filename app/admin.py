from django.contrib import admin
# from .models import Recipet,Category,Expanse
from .models import Recipet
from .models import Category

# Register your models here.
admin.site.register(Recipet)
admin.site.register(Category)
# admin.site.register(Expanse)