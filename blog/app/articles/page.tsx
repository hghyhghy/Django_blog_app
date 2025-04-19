
'use client';
import { useEffect,useState } from "react";
import { fetchArticles,deleteArticle } from "@/library/api";
import Link from "next/link";


export  default function ArticlesPage(){
    const [articles, setarticles] = useState<any[]>([])

    useEffect(() => {
      
        fetchArticles().then(setarticles)

    }, [])
    const handledelete  =  async (id:number) => {
        await deleteArticle(id)
        setarticles(prev =>  prev.filter(article =>  article.id !== id))
    };

    return (

        <div className=" p-6">
         <h1  className="text-2xl font-bold mb-4">Articles</h1>
         <Link href="/articles/create" className="text-blue-500 mb-4 block">+ Create Article</Link>
         <ul>
            {articles.map(article => (
                <li
                key={article.id}
                className="mb-4 p-4 border rounded"
                >

<h2 className="text-xl font-semibold">{article.title}</h2>
            <p>{article.content}</p>
            <div className="space-x-4 mt-2">
              <Link href={`/articles/${article.id}`} className="text-green-600">View</Link>
              <Link href={`/articles/update/${article.id}`} className="text-yellow-600">Edit</Link>
              <button
              onClick={() => handledelete(article.id)}
               className="text-red-600"
              >
                    Delete
              </button>
            </div>
                </li>
            ))}
         </ul>

        </div>
    )
    
}