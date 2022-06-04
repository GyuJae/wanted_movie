import dynamic from 'next/dynamic'

const AccountForm = dynamic(() => import('@components/AccountForm'), { ssr: false })
const LoginToastMessage = dynamic(() => import('@components/Layout/LoginToastMessage'), { ssr: false })

interface IProps {
  children: React.ReactNode
}

const DetailLayout = ({ children }: IProps) => {
  return (
    <div className='text-white'>
      <LoginToastMessage />
      <AccountForm />
      <main>{children}</main>
    </div>
  )
}

export default DetailLayout
