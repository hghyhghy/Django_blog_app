from django.db import models
class Article(models.Model):
    title = models.CharField(max_length=200)
    content =  models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_generated = models.BooleanField(default=False) #optional flag for the ai generated blogs 
    
    
    def __str__(self):
        return f"{self.title} = {self.content[:20]}.."
    
    
