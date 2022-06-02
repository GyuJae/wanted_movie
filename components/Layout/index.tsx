import Head from 'next/head'
import dynamic from 'next/dynamic'
import { showNavState } from 'atoms/showNavState'
import { useRecoilValue } from 'recoil'

import { Variants, motion } from 'framer-motion'

const Nav = dynamic(() => import('./Nav'))
const Header = dynamic(() => import('./Header'))
const SideMe = dynamic(() => import('./SideMe'))
const AccountForm = dynamic(() => import('@components/AccountForm'))

interface IProps {
  title?: string
  showHeader?: boolean
  showNav?: boolean
  children: React.ReactNode
}

const paddingVariants: Variants = {
  animate: (showAllNav) => ({
    paddingLeft: showAllNav ? '200px' : '57px',
    transition: {
      type: 'tween',
    },
  }),
}

const Layout = ({ children, title, showHeader = true, showNav = true }: IProps) => {
  const showAllNav = useRecoilValue(showNavState)

  return (
    <div className='flex overflow-x-hidden min-h-screen text-white bg-black transition-all'>
      <Head>
        <title>{title ? `${title} | Wanted Movie App` : 'Wanted Movie App'}</title>
      </Head>
      <div>{showNav && <Nav />}</div>
      <div className='flex flex-col flex-1 min-h-screen'>
        <motion.div variants={paddingVariants} animate='animate' custom={showAllNav} initial={false}>
          {showHeader && <Header />}
        </motion.div>
        <motion.main
          className='flex-1 p-4 w-full'
          variants={paddingVariants}
          animate='animate'
          custom={showAllNav}
          initial={false}
        >
          {children}
        </motion.main>
      </div>
      <SideMe />
      <AccountForm />
    </div>
  )
}

export default Layout
