from django.urls import path
from .views import CategoryCreate
from .views import CategoryDelete
from .views import CategoryUpdate

urlpatterns=[
    path('api/category/create/', CategoryCreate.as_view()),
    path('api/category/<pk>/delete/', CategoryDelete.as_view()),
    path('api/category/<pk>/update/', CategoryUpdate.as_view()),
    
]