import { Children, createContext, useEffect, useState } from "react"
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
}
