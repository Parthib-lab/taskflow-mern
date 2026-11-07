import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'

import API from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check whether the saved token is valid
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await API.get('/auth/me')

        setUser(response.data.user)
        setIsAuthenticated(true)

      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        setUser(null)
        setIsAuthenticated(false)

      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [])

  // Save login information
  const login = (userData, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))

    setUser(userData)
    setIsAuthenticated(true)
  }

  // Remove login information
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)