import Head from 'next/head'
import dynamic from 'next/dynamic'

const Nav = dynamic(() => import('./Nav'))
const Header = dynamic(() => import('./Header'))

interface IProps {
  title?: string
  children: React.ReactNode
}

const Layout = ({ children, title }: IProps) => {
  return (
    <div className='flex min-h-screen text-white bg-black'>
      <Head>
        <title>{title ? `${title} | Wanted Movie App` : 'Wanted Movie App'}</title>
      </Head>
      <div>
        <Nav />
      </div>
      <div className='flex flex-col flex-1 min-h-screen'>
        <Header />
        <main className='flex-1 p-4'>{children}</main>
      </div>
    </div>
  )
}

export default Layout
