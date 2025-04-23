
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from  ..models import Article
from  ..serializers  import  ArticleSerializer

# toggle bookmark  add/remove 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_bookmark(request,article_id):
    user  = request.user
    try:
        article  =  Article.objects.get(id =  article_id)
    except  Article.DoesNotExist:
        return  Response({'error' :  'Article Not Found '}, status=status.HTTP_404_NOT_FOUND)

    if user  in article.bookmarked_by.all():
        article.bookmarked_by.remove(user)
        return Response({'message':'Bookmark removed '})

    else:
        
        article.bookmarked_by.create(user)
        return Response({'message' : 'Bookmark added '})
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bookmarked_articles(request):
    user  =  request.user
    articles  =  Article.objects.all()
    serializer =  ArticleSerializer(articles , many=True)
    return  Response(serializer.data)