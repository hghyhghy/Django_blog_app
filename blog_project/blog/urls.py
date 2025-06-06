
from  django.urls  import  path
from  .views import article_views,auth_views,gemini_views
from  .search import search
from .comment import views
from .bookmark import bookmark_views

urlpatterns = [
    # article endpoints
    path('articles/', article_views.get_articles,name='get_articles'),
    path('articles/<int:pk>/', article_views.get_article,name='get_article'),
    path('articles/create/', article_views.create_article,name='create_article'),
    path('articles/update/<int:pk>/', article_views.update_article,name='update_article'),
    path('articles/delete/<int:pk>/',article_views.delete_article,name='delete_article'),
    
    # auth endpoints 
    path('auth/register/',auth_views.register,name='register'),
    path('auth/login/', auth_views.login_user,name='login'),
    
    # ai article endpoints 
    path('articles/generate/',gemini_views.generate_and_store_article,name='generate_article' ),
    path('articles/get/',gemini_views.get_generated_articles,name='get_generated_article'),
    
    # search  functionality endpoints 
    path('articles/search/' ,  search.search_articles,  name='search_articles'),
    # url path  for the  comments
    
    path('articles/<int:article_id>/comments/', views.get_comments, name='get_comments'),
    path('articles/<int:article_id>/comments/add/', views.post_comment, name='post_comment'),
    
    # endpoint for adding bookmark  
    path('articles/<int:article_id>/bookmark/', bookmark_views.toggle_bookmark, name='toggle_bookmark'),
    path('articles/bookmarked/', bookmark_views.get_bookmarked_articles, name='get_bookmarked_articles'),
]