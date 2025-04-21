
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import Article
from ..serializers import ArticleSerializer
from ..gemini_service import  generate_article

@api_view(['POST'])
def generate_and_store_article(request):
    topic =  request.data.get('topic')
    if not topic:
        return Response({'error': 'Topic is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        content  = generate_article(topic)
        article =  Article.objects.create(title=topic , content=content ,is_generated = True)
        serializer =  ArticleSerializer(article)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])
def get_generated_articles(request):
    try:
        generated_articles  =  Article.objects.filter(is_generated  = True).order_by('-id')
        serializer  =   ArticleSerializer(generated_articles,many=True)
        return Response(serializer.data ,  status=status.HTTP_200_OKt)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
