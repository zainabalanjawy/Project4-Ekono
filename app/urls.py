from django.urls import path
from .views import ExpanseCreate,ExpanseDelete,ExpanseUpdate,ExpanseList,ExpanseDetails,RecipetDelete,RecipetList,RecipetCreate,CategoryCreate,CategoryDelete,CategoryUpdate

urlpatterns=[
    path('api/category/create/', CategoryCreate.as_view()),
    path('api/category/<pk>/delete/', CategoryDelete.as_view()),
    path('api/category/<pk>/update/', CategoryUpdate.as_view()),
    path('api/Recipet/create/', RecipetCreate.as_view()),
    path('api/Recipet/<pk>/delete/', RecipetDelete.as_view()),
    path('api/Recipet/List/', RecipetList.as_view()),
    path('api/Expenses/Create/', ExpanseCreate.as_view()),
    path('api/Expenses/<pk>/Delete/', ExpanseDelete.as_view()),
    path('api/Expenses/<pk>/Update/', ExpanseUpdate.as_view()),
    path('api/Expenses/List/', ExpanseList.as_view()),
    path('api/Expenses/<pk>/Details/', ExpanseDetails.as_view()),
    
]