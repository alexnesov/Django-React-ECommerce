from django.urls import path
from . import views




urlpatterns = [
    
    path('', views.getProducts, name='token_obtain_pair'),

    path('api/users/login', views.MyTokenObtainPairView.as_view(), 
          name='token_obtain_pair'),

    path('api/users/register/', views.registerUser, name='register'),

    path('api/users/profile', views.getUserProfile, name="users-profile"),
    path('api/users', views.getUsers, name="users-profile"),

    path('api/products/', views.getProducts, name="products"),
    path('api/products/<str:pk>', views.getProduct, name="products"),
    
]