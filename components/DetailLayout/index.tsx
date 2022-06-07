import Head from 'next/head'
import dynamic from 'next/dynamic'

const AccountForm = dynamic(() => import('@components/AccountForm'), { ssr: false })
const Portal = dynamic(() => import('@components/Portal'), { ssr: false })
const LoginToastMessage = dynamic(() => import('@components/LoginToastMessage'), { ssr: false })

interface IProps {
  children: React.ReactNode
}

const DetailLayout = ({ children }: IProps) => {
  return (
    <div className='text-white'>
      <Head>
        <title>Wanted Movie App</title>
      </Head>
      <Portal>
        <LoginToastMessage />
      </Portal>
      <AccountForm />
      <main>{children}</main>
    </div>
  )
}

export default DetailLayout
