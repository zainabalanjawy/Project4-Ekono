from django.urls import path
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView,LogoutView
from .views import UserCreateView, UserDestroyView, UserListView, UserUpdateView, UserRetrieveView

urlpatterns = [
    path('register/', RegisterView.as_view(),name="rest_register"),
    path('login/', LoginView.as_view(),name="rest_login"),
    path('logout/', LogoutView.as_view(),name="rest_logout"),
    path('profile/<pk>/', UserRetrieveView.as_view(), name='rest_view_profile'),
    path('view/all/', UserListView.as_view()),
    path('update/<pk>', UserUpdateView.as_view())
]