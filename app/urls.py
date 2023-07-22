from django.urls import path
from .views import ExpanseCreate,ExpanseDelete,ExpanseUpdate,ExpanseList,ExpanseDetails

urlpatterns=[
        path('api/Expenses/Create/', ExpanseCreate.as_view()),
        path('api/Expenses/<pk>/Delete/', ExpanseDelete.as_view()),
        path('api/Expenses/<pk>/Update/', ExpanseUpdate.as_view()),
        path('api/Expenses/List/', ExpanseList.as_view()),
        path('api/Expenses/<pk>/Details/', ExpanseDetails.as_view()),
]