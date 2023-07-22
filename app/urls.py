from django.urls import path
from .views import RecipetDelete,RecipetCreate

urlpatterns=[
    path('api/Recipet/create/', RecipetCreate.as_view()),
    path('api/Recipet/<pk>/delete/', RecipetDelete.as_view()),
]