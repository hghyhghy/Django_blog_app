
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from ..models import Comment, Article
from ..serializers import CommentSerializer

@api_view(['GET'])
def get_comments(request,article_id):
    comments =  Comment.objects.filter(article_id=article_id, parent=None)
    serializer =  CommentSerializer(comments,many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_comment(request,article_id):
    
    content  =  request.data.get('content')
    parent_id  =  request.data.get('parent')

    if not content:
        return Response({'error':'content is required'},  status=status.HTTP_400_BAD_REQUEST)
    
    try:
        article=  Article.objects.get(id=article_id)
    except Article.DoesNotExist:
        return Response({'error':'Article  not found'} ,  status=status.HTTP_404_NOT_FOUND)
    
    parent_comment = None
    
    if parent_id:
        try:
            parent_comment  =  Comment.objects.get(id=parent_id,article=article)
        except Comment.DoesNotExist:
            return Response({'error':'Parent comment not found'}, status=status.HTTP_404_NOT_FOUND)
        
    comment  =  Comment.objects.create(
        
        article=article,
        user=request.user,
        content=content,
        parent= parent_comment
    )
    
    serializer =  CommentSerializer(comment)
    return Response(serializer.data,status=status.HTTP_201_CREATED)