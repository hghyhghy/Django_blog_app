
from rest_framework import serializers
from .models import Article
from .models import  Comment


class  RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer =  self.parent.parent.__class__(value,context=self.context)
        return serializer.data
    
class  CommentSerializer(serializers.ModelSerializer):
    replies  =  RecursiveField(many=True,  read_only=True)
    user  =  serializers.StringRelatedField()
    parent = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'user', 'content', 'created_at', 'replies', 'parent']


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'  # This includes all fields from the Article model
