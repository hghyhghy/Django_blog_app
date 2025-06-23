
from django.urls import path
from . import views

urlpatterns = [
    
    path('api/blogs/', views.get_blogs),
    path('api/search-blogs/', views.search_blogs),
    path('api/blogs/create/', views.create_blog),
    path('api/blogs/update/<int:blog_id>/', views.update_blog),
    path('api/blogs/delete/<int:blog_id>/', views.delete_blog),
    path('api/get-blogs/<int:blog_id>/', views.get_blog_details),
]
