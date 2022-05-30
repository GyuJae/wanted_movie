import Head from 'next/head'
import dynamic from 'next/dynamic'

const Nav = dynamic(() => import('./Nav'))
const Header = dynamic(() => import('./Header'))

interface IProps {
  title?: string
  showHeader?: boolean
  showNav?: boolean
  children: React.ReactNode
}

const Layout = ({ children, title, showHeader = true, showNav = true }: IProps) => {
  return (
    <div className='flex overflow-x-hidden min-h-screen text-white bg-black transition-all'>
      <Head>
        <title>{title ? `${title} | Wanted Movie App` : 'Wanted Movie App'}</title>
      </Head>
      <div>{showNav && <Nav />}</div>
      <div className='flex flex-col flex-1 min-h-screen'>
        {showHeader && <Header />}
        <main className='flex-1 p-4 pl-20 w-full lg:pl-48'>{children}</main>
      </div>
    </div>
  )
}

export default Layout
