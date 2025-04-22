
'use client'
import { useState,useEffect } from "react"
const SEARCH_API_URL = 'http://127.0.0.1:8000/articles/search/';

export default  function  SearchPage() {
    const [query, setquery] = useState('')
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // clears the result section  when thye query is cleared from the search input field

    useEffect(() => {

        if  (query.trim() === ""){
            setResults([]);
        }
    },[query])


    const handleSearch =  async () => {
        if (!query){
            return

        }
        setLoading(true)
        setError(null)

        try {
            
            const response  =  await  fetch(`${SEARCH_API_URL}?q=${encodeURIComponent(query)}`, {
                method:"GET"
            });
            const data =  await  response.json()
            if(!response.ok){
                throw  new Error(data.error || 'Search failed')
            };
            setResults(data)
        } catch (err: any) {
            setError(err.message)
        }
        finally{
            setLoading(false)
        }
    }

    return (

        <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1  className="text-2xl font-bold mb-4 text-center text-blue-700">
                        Search  Articles 
                    </h1>

                    <div className=" flex  space-x-2  mb-6">
                            <input 
                            type="text"
                            placeholder="Search Articles "
                            value={query}
                            onChange={e =>  setquery(e.target.value)}
                            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                            />

                            <button
                            onClick={handleSearch}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"

                            >   
                            Search 

                            </button>
                    </div>

                    {loading && <p className="text-center text-gray-500">Searching...</p>}
                    {error && <p className="text-center text-red-600 font-medium">{error}</p>}


                        <div className=" space-y-4">
                                {results.map((article) => (
                                    <div
                                    key={article.id} 
                                     className="p-4 border rounded bg-gray-100"
                                    >
                                        <h2  className="text-lg font-semibold text-blue-600">{article.title} </h2>
                                        <p className="  text-gray-800  mt-1"  > { article.content} </p>
                                    </div>

                                ))}
                        </div>

                        { !loading  &&  results.length === 0 && query &&(
                            <p className="text-center text-gray-600 mt-4">  No  Articles Found </p>
                        ) }

                </div>
        </div>
    )

}