
'use client'
import { useState,useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"

// declaring interface for the article 
interface Article{
    id:number,
    title:string,
    content:string
}

interface  Comment {
    id:number,
    user:string,
    content:string,
    parent:number | null,
    replies :  Comment[]
}

export default function ArticlesPage () {

    const [articles, setArticles] = useState<Article[]>([])
    const [comments, setComments] = useState<Record <number , Comment[]> > ({})
    const [newComment, setNewComment] = useState<Record <number , string> > ({})
    const [replyContent, setReplyContent] = useState<Record<number, string>>({})
    const access  = Cookies.get('access')

    const fetchArticles =  async() => {
        const response =  await  axios.get('http://127.0.0.1:8000/articles/')
        setArticles(response.data)
    }

    useEffect(() => {
        fetchArticles()
    },[])

    const   fetchComments  =  async(articleId:number) => {

        const response =   await  axios.get(`http://127.0.0.1:8000/articles/${articleId}/comments/`)
        setComments((prev) =>  ({...prev, [articleId]:response.data}))
    }

    const handleCommentSubmit = async(articleId:number) => {

        const  content =  newComment[articleId]
        if (!content)  return
        await axios.post(
             `http://127.0.0.1:8000/articles/${articleId}/comments/add/`,
             {content},
             {
                headers:{
                    Authorization: `Bearer ${access}`
                }
             }
        )
        setNewComment(prev =>  ({...prev,[articleId]:""}))
        fetchComments(articleId)

    }

    const handleReplySubmit =  async(articleId:number,parentId:number) => {
        const content =  replyContent[parentId]
        if (!content)  return

        await axios.post(
            `http://127.0.0.1:8000/articles/${articleId}/comments/add/`,
            {content},
            {
                headers:{
                    Authorization: `Bearer ${Cookies.get('access')}`
                        }
            }
        )
        setReplyContent(prev =>  ({...prev,  [parentId]:""}))
        fetchComments(articleId)






    }


    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1  className="text-2xl font-bold mb-4">
                All  Articles 
            </h1>
                {articles.map((article) => (

                    <div
                    key={article.id}
                    className="border p-4 mb-6 rounded"
                    >
                            <h2 className="text-xl font-semibold">{article.title} </h2>
                            <p className="mt-2">
                                {article.content}
                            </p>
                            <button
                            onClick={() => fetchComments(article.id)}
                            className="text-blue-600 mt-4  border-2 border-blue-500"
                            >
                                Show Comments
                            </button>

                            {comments[article.id] ?.map((comment) => (
                                <div
                                key={comment.id}
                                className=" ml-4 mt-3"
                                >
                                        <p>
                                            <strong>
                                                {comment.user}
                                            </strong> :
                                            <strong>
                                                {comment.content}
                                            </strong>
                                        </p>
                                        <input 
                                        type="text"
                                        value={replyContent[comment.id] || ""}
                                        onChange={(e) =>  

                                            setReplyContent(prev => ({...prev,  [comment.id]:e.target.value}))
                                        }
                                        placeholder="Reply"
                                        className=" border p-1  mt-1 w-full"
                                        />

                                        <button
                                        onClick={() => handleReplySubmit(article.id, comment.id)}
                                        className="text-sm text-green-700 mt-1"

                                        >
                                            Reply
                                        </button>

                                            {comment.replies  && comment.replies.length >  0 && (
                                                <div
                                                className="ml-6   mt-2"
                                                >
                                                    {comment.replies.map((reply) => (
                                                        <div
                                                        key={reply.id}
                                                         className="text-sm text-gray-800 mb-1"
                                                        >
                                                            <strong>
                                                                {reply.user}
                                                            </strong> :
                                                            <strong>
                                                                {reply.content}
                                                            </strong>

                                                        </div>
                                                    ))}

                                                </div>
                                            )}
                                </div>


                            ))}

                            <input 
                            type="text"
                            value={newComment[article.id] || ""}
                            onChange={(e) => 
                                setNewComment(prev =>  ({...prev ,  [article.id] :  e.target.value}))
                            }
                            placeholder="Write a comment"
                            className="border p-1 mt-4 w-full"

                            />
                            <button
                            onClick={() => handleCommentSubmit(article.id)}
                            >
                                Post  Comment 
                            </button>
                    </div>
                ))}
        </div>

    )



}