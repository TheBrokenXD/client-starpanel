import Layout from '../components/Layout'
// styles
import '../styles/nprogress.css'
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
import { RecoilRoot } from 'recoil';
// theme
import { ThemeProvider } from 'next-themes'

const noAuthRequired = ['/', '/signIn', '/signUp', '/services']

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  return (
    <AuthContextProvider>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ): (
            <ProtectedRoute>
              <RecoilRoot>
                <Component {...pageProps} />
              </RecoilRoot>
            </ProtectedRoute>
          )}
        </Layout>
      </ ThemeProvider>
    </AuthContextProvider>
  )
}

export default MyApp
