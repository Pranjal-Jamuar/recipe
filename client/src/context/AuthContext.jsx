import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      axios.get("/api/auth/me").then(res => {
        setUser(res.data)
      })
    }
  }, [])

  const login = async (email, password) => {
    const res = await axios.post("/api/auth/login", {
      email,
      password,
    })
    console.log(res.data)
    localStorage.setItem("token", res.data.token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`
    setUser(res.data)
  }

  const register = async (userName, email, password) => {
    const res = await axios.post("/api/auth/register", {
      userName,
      email,
      password,
    })
    console.log(res.data)
    localStorage.setItem("token", res.data.token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`
    setUser(res.data)
  }

  const logOut = () => {
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
