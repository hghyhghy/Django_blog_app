
'use client'
import { useEffect,useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

const API_BASE="http://127.0.0.1:8000/"

interface Blogs{
    id:number,
    title:string,
    content:string
}

const DynamicImports  =  dynamic(() =>  import("./searchblogs/page"),{
    ssr:false
})

export  default function Blogapp(){

    const router  =  useRouter()
    const [blogs, setBlog] = useState<Blogs[]>([])
    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")
    

    useEffect(() => {
        loadblogs()
    },[])

    const loadblogs =  async () =>  {
        try {
            const blog   =  await axios.get(`${API_BASE}api/blogs/`)
            setBlog(blog.data as Blogs[])
        } catch (error) {
            console.log(error)
        }
    }

    const  createblog  = async()=>{
        if (!title || !content) return;
        try {
            await axios.post(`${API_BASE}api/blogs/create/`, {title,content})
            settitle('')
            setcontent('')
            loadblogs()

        } catch (error) {
            console.log(error)
        }
    }


    
    const deleteblog =  async(id:number)=>{
        try {
            await axios.delete(`${API_BASE}/api/blogs/delete/${id}/`)
            loadblogs()
        } catch (error) {
            console.log(error)
        }   
    }


    return(


        <main className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
                blog App
            </h1>
            <DynamicImports/>

            <div className=" mb-6">
                <input 
                type="text"
                value={title}
                onChange={e => settitle(e.target.value)}
                placeholder="Enter the topic name "
                className="w-full border p-2 mb-2"

                />
                <textarea 
                value={content}
                onChange={e=>setcontent(e.target.value)}
                placeholder="Write content here"
                className="w-full border p-2 mb-2"

                />
                <button
                className="bg-blue-600 text-white px-4 py-2"
                onClick={createblog}
                >
                    Create Blog
                </button>
            </div>



            {blogs.map( blog => (

                <div key={blog.id} className="border p-4 mb-4">
                    <h3 className="text-xl font-bold mb-2">
                        {blog.title}
                    </h3>
                    <p className=" mb-2">
                        {blog.content}
                    </p>
                    <button
                    className=" text-blue-600 mr-2"
                    onClick={() =>  router.push(`/edit/${blog.id}`)}
                    >
                        Edit
                    </button>
                    <button
                    onClick={()=>deleteblog(blog.id)}
                    className="text-red-600 mt-2"

                    >
                        Delete
                    </button>
                    
                </div>
            ))}
        </main>
    )

}