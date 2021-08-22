from django.urls import path
from . import views

urlpatterns = [
    path('list-categories/', views.ListCategoryView.as_view(), name = 'list-categories'),
    path('detail-product/<str:pk>/', views.CategoryDetailView.as_view(), name = 'detail-products'),
    path('category-products/', views.ListProductsCategory.as_view(), name = 'category-products'),
    path('detail-category-product/', views.DetailProductCategory.as_view(), name = 'detail-category-product'),
    path('order/', views.OrderView.as_view(), name = 'order'),
    path('order-detail/', views.OrderDetailView.as_view(), name = 'order-detail'),
    path('favorite/', views.FavoriteView.as_view(), name = 'favorite'),
    
    # authentication
    
    path('sign-in/', views.SignInView.as_view(), name = 'sign-in'),
    path('register/', views.RegisterView.as_view(), name = 'register'),
    path('middleware/', views.MiddlewareView.as_view(), name = 'middleware')
]
