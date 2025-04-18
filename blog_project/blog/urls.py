
from  django.urls  import  path
from  blog import views

urlpatterns = [
    path('articles/', views.get_articles,name='get_articles'),
    path('articles/<int:pk>/', views.get_article,name='get_article'),
    path('articles/create/', views.create_article,name='create_article'),
    path('articles/update/<int:pk>/', views.update_article,name='update_article'),
    path('articles/delete/<int:pk>/',views.delete_article,name='delerte_article')
]