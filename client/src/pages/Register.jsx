import React, { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await register(userName, email, password)
      navigate("/")
    } catch (err) {
      console.error("Registration Error: ", err)
    }
  }

  return (
    <div className='max-w-md mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Register</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-gray-700'>UserName</label>
          <input
            type='text'
            value={userName}
            onChange={e => setUserName(e.target.value)}
            required
            className='w-full p-2 border rounded'
          />
        </div>
        <div>
          <label className='block text-gray-700'>Email</label>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className='w-full p-2 border rounded'
          />
        </div>
        <div>
          <label className='block text-gray-700'>Password</label>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className='w-full p-2 border rounded'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded hover:bg-blue-800'
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
