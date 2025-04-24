
'use client';
import { useEffect,useState } from "react";
import { fetchArticles,deleteArticle } from "@/library/api";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FaEdit,FaBookmark } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

export  default function ArticlesPage(){
    const [articles, setarticles] = useState<any[]>([])
    const [bookmarked, setBookmarked] = useState<Record<number,Boolean>>({})

    const access  =   Cookies.get('access')

    const  togglebookmark =  async(articleId:number) => {
      try {
        const response  =  await  axios.post(
           `http://127.0.0.1:8000/articles/${articleId}/bookmark/`,
           {},
           {
            headers:{
              Authorization:`Bearer ${access}`
            }
           }
        )
        const  message  =  response.data.message 
        if (message == 'Bookmark added'){
          setBookmarked(prev =>  ({...prev,  [articleId]:true}))
        } else {
          setBookmarked(prev =>  ({...prev,  [articleId]:false}))
        }
      } catch (error) {
        console.log('Error handling bookmark:', error)
      }
    }


    useEffect(() => {
      
        fetchArticles().then(setarticles)

    }, [])
    const handledelete  =  async (id:number) => {
        await deleteArticle(id)
        setarticles(prev =>  prev.filter(article =>  article.id !== id))
    };

    return (
        <div className="p-6 bg-[#FFFFFF] min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Articles</h1>
        <Link href="/articles/create" className="text-blue-500 mb-6 block">+ Create Article</Link>
  
        <div className=" grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  flex flex-row  items-center justify-around ">
            <div>

                <h1> Available Blogs </h1>
            </div>
            <div className=" flex flex-col gap-3 ">
            {articles.map(article => (
            <div key={article.id} className="p-4 border rounded-lg shadow bg-[#F5F5F5]">
              <h2 className="text-xl font-semibold text-blue-500  ">{article.title}</h2>
              <p className="text-sm text-gray-700 mt-2">{article.content}</p>
              <div className="space-x-4 mt-4 flex flex-row ">
                <Link href={`/articles/${article.id}`} className="text-green-600"><FaEye /></Link>
                <Link href={`/articles/update/${article.id}`} className="text-yellow-600"><FaEdit /></Link>
                <button
                  onClick={() => handledelete(article.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
                <button
                onClick={() => togglebookmark(article.id)}
                className={`text-${bookmarked[article.id] ? "blue cursor-pointer" : "gray"}-600 cursor-pointer`}
                title={bookmarked[article.id] ? "Remove Bookmark" : "Add Bookmark"}
                >
                  <FaBookmark/>
                </button>
              </div>
            </div>
          ))}
            </div>

        </div>
      </div>
    )
    
}