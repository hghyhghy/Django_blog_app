
'use client'
import { useState,useEffect,useCallback } from "react"
import { useParams,useRouter } from "next/navigation"
import axios from "axios"

const API_BASE = 'http://localhost:8000/'
interface  Blog{
    id:number
    title:string
    content:string
}
export  default function updateblog(){

    const router  =  useRouter()
    const {id}  = useParams()
    const [title, settitle] = useState('')
    const [content, setcontent] = useState('')
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState<string | null>(null)
    const numberid  =  Number(id)   


    useEffect(() => {
        if (!id) return ;
        const  getallblogs  =  async() => {
            try {
                const res  =  await  axios.get<Blog>(`${API_BASE}api/get-blogs/${numberid}/`)
                const blog:Blog =  res.data;
                settitle(blog.title)
                setcontent(blog.content)
            } catch (error) {
                console.log(error)
            } finally{
                setloading(false)
            }
    }

        getallblogs()

    },[id,numberid])

    const handleupdate   =  useCallback(async() =>  {
        if (!title.trim() ||  !content.trim()){
            seterror('Title and content can not be null')
            return
        }

        try {
        await axios.put(`${API_BASE}api/blogs/update/${numberid}/`,{title,content})
        router.push('/')

        } catch (error:any) {
            console.log(error)
            seterror(error)
        }
    },[title,content,router,numberid])



    if (loading){
        return (
      <main className="p-6 max-w-2xl mx-auto text-center">
        <p className="text-gray-500">Loading blog...</p>
      </main>
    )
    }
    return(

        <main className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Blog #{id}</h1>
            <input 
            className="w-full border p-2 mb-2"
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            placeholder="title"
            />
            <textarea
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            placeholder="content"
            className="w-full border p-2 mb-2"

            />

            <button
            className="bg-green-600 text-white px-4 py-2"
            onClick={handleupdate}
            >
                Update blog
            </button>


        </main>
    )


}