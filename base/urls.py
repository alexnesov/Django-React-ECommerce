from django.urls import path
from . import views




urlpatterns = [
    path('', views.getRoutes, name="routes"),
    
    path('api/products/', views.getProducts, name="products"),
    path('api/products/<str:pk>', views.getProduct, name="products"),
    
    path('api/users/login', views.MyTokenObtainPairView.as_view(), 
          name='token_obtain_pair'),


    path('api/users/profile', views.getUserProfile, name="users-profile"),

]