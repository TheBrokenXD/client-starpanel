import Layout from '../components/Layout'
// styles
import '../styles/index.css'
// font-awesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { AuthContextProvider } from '../context/AuthContext'
config.autoAddCss = false
// react
import { useRouter } from 'next/router'
// auth
import ProtectedRoute from '../components/ProtectedRoute'
const noAuthRequired = ['/', '/signIn', '/signUp', '/services']

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  return (
    <AuthContextProvider>
      <Layout>
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ): (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </Layout>
    </AuthContextProvider>
  )
}

export default MyApp
