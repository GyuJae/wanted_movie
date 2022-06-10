import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id='portal' className='text-white' />
          <NextScript />
        </body>
      </Html>
    )
  }
}
