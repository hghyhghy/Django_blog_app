from django.shortcuts import render
from  rest_framework import  status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Article
from .serializers  import ArticleSerializer

@api_view(['POST'])
def create_article(request):
    
    if request.method == 'POST':
        serializer  =  ArticleSerializer(data  = request.data)
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_articles(request):
    
    if request.method == 'GET':
        articles =  Article.objects.all()
        serializer =  ArticleSerializer(articles,many=True)
        return Response(serializer.data)
    

@api_view(['GET'])
def get_article(request,pk):
    try:
        article  =  Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer  =  ArticleSerializer(article)
        return Response(serializer.data)

@api_view(['PUT'])
def update_article(request,pk):
    try:
        article  =  Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        serializer  =  ArticleSerializer(article, data=  request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(    serializer.errors ,  status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_article(request, pk):
    try:
        article = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)