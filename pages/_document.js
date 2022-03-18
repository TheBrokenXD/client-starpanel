import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className='custom-main-bg overflow-x-hidden'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}