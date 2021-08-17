from django.urls import path
from . import views

urlpatterns = [
    path('list-categories/', views.ListCategoryView.as_view(), name = 'list-categories'),
    path('detail-product/<str:pk>/', views.CategoryDetailView.as_view(), name = 'detail-products'),
    path('category-products/', views.ListProductsCategory.as_view(), name = 'category-products'),
    path('detail-category-product/', views.DetailProductCategory.as_view(), name = 'detail-category-product')
]
