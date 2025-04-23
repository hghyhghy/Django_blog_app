from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    title = models.CharField(max_length=200)
    content =  models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_generated = models.BooleanField(default=False) #optional flag for the ai generated blogs 
    bookmarked_by =  models.ManyToManyField(User,related_name='bookmarked_articles', blank=True)
    
    
class  Comment(models.Model):
        article =  models.ForeignKey(Article, related_name='comment', on_delete=models.CASCADE)
        user = models.ForeignKey(User,on_delete=models.CASCADE)
        content  = models.TextField()
        parent  =  models.ForeignKey('self', null=True, blank=True ,  related_name='replies',  on_delete=models.CASCADE)
        created_at =  models.DateTimeField(auto_now_add=True)
    
class Meta:
        ordering = ['created_at']
        
        
def __str__(self):
        return f"{self.title} = {self.content[:20]}.."
    
    
