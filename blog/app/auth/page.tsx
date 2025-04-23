
'use client'
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'
const BASE_URL = 'http://127.0.0.1:8000/auth';

export default function  AuthPage(){
    const [isLogin, setIsLogin] = useState(false)
    const [form, setForm] = useState({username:'',email:'',password:''})
    const router =  useRouter()

    // universal spread operator which  will  store the prev form and  add the updates that user makes in the form  
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form,[e.target.name] : e.target.value})
    }

    const handleSubmit  =  async() => {
        const endpoint    =  isLogin ? 'login':'register';
        const  payload =  isLogin ? 
        {username:form.username , password:form.password}:
        {username:form.username, email:form.email,  password:form.password}


        const res =  await  fetch(`${BASE_URL}/${endpoint}/`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)
        })

        const data  =  await res.json()
        if (res.ok){
            if (data.token){
                Cookies.set('token',data.token,{expires:7})
            }
            router.push('/middle')

        }else{
            alert(data.error || 'Something went wrong')

        }
    }

    return(
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                   <div className="bg-white p-6 rounded shadow-md w-96">
                   <h1 className="text-2xl font-bold mb-4 text-center">

                            {isLogin ? 'Login':'Register'}
                            </h1>

                    <input
                    name="username"
                    value={form.username}
                    placeholder="Username"
                    onChange={handleChange}
                    className="w-full mb-3 px-4 py-2 border rounded text-black"

                    />

                    {!isLogin && (
                        <input 
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                         className="w-full mb-3 px-4 py-2 border rounded text-black"
                        />
                    )}
                    <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full mb-4 px-4 py-2 border rounded text-black"

                    />
                    <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        {isLogin ? 'Login':"Register"}

                    </button>
                    <p className="text-sm mt-4 text-center">
                        {isLogin ? 'New here?' : 'Already have an account?'}{' '}
                        <span
                            className="text-blue-600 cursor-pointer underline"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Register' : 'Login'}
                        </span>
                        </p>
                    </div>
            </div>

    )



}