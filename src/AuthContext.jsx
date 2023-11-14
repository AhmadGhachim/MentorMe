import React, { useContext, useState, useEffect } from "react"
import { auth } from "../backend/Firebase"
import { signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
  updateProfile
 } 
 from "firebase/auth"


const AuthContext = React.createContext()



export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [status, setStatus] = useState('')
  function signup(email, password, name, userStatus) {
    setUserName(name)
    setStatus(userStatus)
    return createUserWithEmailAndPassword(auth,email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    setUserName('')
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth,email)
  }

  //May not work, ignore for now
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  //May not work, ignore for now
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
      
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}