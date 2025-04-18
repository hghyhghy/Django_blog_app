
import axios from "axios";
const BASE_URL = 'http://127.0.0.1:8000/api/articles';
export const fetchArticles  = async() => {
    const response  =  await axios.get(BASE_URL)
    return response.data

}

export  const fetchArticle =  async(id:number) => {
    const response  =  await axios.get(`${BASE_URL}/${id}/`);
    return  response.data
}

export const  createArticle =  async(data:any) => {
    const response   =  await axios.post(`${BASE_URL}/create/`, data);
    return response.data
}

export const updateArticle =  async(id:number,  data:any) => {
    const response =   await   axios.put(`${BASE_URL}/update/${id}/`, data)
    return  response.data
}

export  const deleteArticle =  async(id:number)=>{
    await axios.delete(`${BASE_URL}/delete/${id}`)
}
