
'use client'
import { useState,useEffect,useCallback } from "react"
import axios from "axios"
import debounce from  "lodash.debounce"

export  default  function searchblogbytitle(){
    const [query, setquery] = useState('')
    const [results, setresults] = useState([])


    const debouncesearch  =  useCallback(
        debounce(async(searchtext:string) =>  {

            if (!searchtext.trim()){
                setresults([])
                return
            }
            
            try {
                const result   =  await  axios.get(`http://127.0.0.1:8000/api/search-blogs/?query=${searchtext}`)
                setresults(result.data as any)

    
            } catch (error) {
                console.log(error)
            }

        },400),
        []
    )

    useEffect(() =>  {
        debouncesearch(query)
    },[query,debouncesearch])


    
    return (
        <main className="p-6 max-w-4xl  mx-auto">
            <input 
            type="text"
            value={query}
            onChange={e => setquery(e.target.value)}
            placeholder="Enter the query"
            className="w-full  border p-2  mb-4"
            />

            {results.map((blog:any) => (

                <div 
                key={blog.id}
                className=" border p-4  mb-2">
                    <h2 className=" text-xl font-semibold">
                        {blog.title}
                    </h2>
                    <p>
                        {blog.content}
                    </p>
                </div>
            ))}
        </main>
    )
}