
'use client';
import { useState,useTransition,useEffect } from "react";
const BASE_URL = 'http://127.0.0.1:8000/articles/generate/'
const BASE_URL1 = 'http://127.0.0.1:8000/articles/get/'


export  default  function GenerateArticlePage(){

    const [topic, setTopic] = useState('')
    const [loading, setLoading] = useState(false)
    const [article, setArticle] = useState<string| null>(null)
    const [error, setError] = useState<string|null>(null)

    const [isPending ,  startTransition] =  useTransition();

    useEffect(() => {
      
        const fetchLatestArticle = async() => {
            try {
                const response  =  await fetch(BASE_URL1 , {
                    method:"GET"
                });
                const  data  = await  response.json()
                
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch latest article');
                }
                setArticle(data.content)

            }  catch (err: any) {
                setError(err.message);
              }
        }
        fetchLatestArticle();
    }, [])
    

    const handleGenerate =  async() => {
        setLoading(true)
        setArticle(null)
        setError(null)

        try {
            
            const res =  await  fetch(BASE_URL, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',

                },
                body:JSON.stringify({topic})
            });
            const data   =  await res.json()
            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong')
              }
            
            startTransition(() => {
                setArticle(data.content)
            })
            
        } catch (error:any) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
                        <input 
                        type="text"
                        placeholder=" Enter the topic"
                        value={topic}
                        onChange={e =>  setTopic(e.target.value)}
                        disabled={loading}
                        className="w-full px-4 py-2 mb-4 border text-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"

                        />

                        <button
                        onClick={handleGenerate}
                        disabled={loading || !topic}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"


                        >

                            {loading ?  'Generating' : 'Generate Article'}

                        </button>
                                            {(loading || isPending) && (
                            <div className="mt-4 text-center text-gray-500">Hang tight... Crafting your article ✍️</div>
                            )}

                            {error && (
                            <div className="mt-4 text-red-600 font-medium text-center">
                                {error}
                            </div>
                            )}

                            {article && (   

                                <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                                                    <h2 className="text-xl font-semibold mb-2 text-gray-700">
                                        Generated Article
                                        </h2>

                                        <p className="text-gray-800 whitespace-pre-line">
                                            {article}
                                        </p>
                                </div>
                            )}
                </div>
        </div>
    )
}


