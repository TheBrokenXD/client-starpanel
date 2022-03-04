import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({children}) => {

    const {user} = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
          router.push('/signIn')
        }
    }, [router, user])

    return (
        <>
            {user ? children : null}
        </>
    );
}
 
export default ProtectedRoute;