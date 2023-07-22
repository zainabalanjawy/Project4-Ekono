from django.urls import path
from .views import RecipetDelete,RecipetCreate,CategoryCreate,CategoryDelete,CategoryUpdate

urlpatterns=[
    path('api/category/create/', CategoryCreate.as_view()),
    path('api/category/<pk>/delete/', CategoryDelete.as_view()),
    path('api/category/<pk>/update/', CategoryUpdate.as_view()),
    path('api/Recipet/create/', RecipetCreate.as_view()),
    path('api/Recipet/<pk>/delete/', RecipetDelete.as_view()),
    
]