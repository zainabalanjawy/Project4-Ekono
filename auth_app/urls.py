from django.urls import path
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView,LogoutView
from .views import UserDestroyView, UserListView, UserUpdateView, UserRetrieveView
from .views import UserLogoutView, UserRegisterView
urlpatterns = [
    path('register/', RegisterView.as_view(),name="rest_register"),
    path('login/', LoginView.as_view(),name="rest_login"),
    path('logout/', UserLogoutView.as_view(),name="rest_logout"),
    path('view/all/', UserListView.as_view()),
    
    #protected urls (only for signed in users)
    path('<pk>/profile/', UserRetrieveView.as_view(), name='rest_view_profile'),
    path('<pk>/update/', UserUpdateView.as_view()),
    path('<pk>/delete/', UserDestroyView.as_view(), name='destroy_view')
]