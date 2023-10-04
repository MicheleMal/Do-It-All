import axios from "axios"

export const getJwtCookie = async ()=>{
    try {
        // const res = await axios.get("http://localhost:5000/auth/cookie/jwt")
        const res = await axios.get("https://doitall.onrender.com/auth/cookie/jwt")
        return res.data.data
    } catch (error) {
        throw error
    }
}