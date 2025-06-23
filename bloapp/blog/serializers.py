

from rest_framework import serializers
from .models import Blog

class Blogserializers(serializers.ModelSerializer):
    class Meta:
        model =  Blog
        fields = ['id','title','content']
