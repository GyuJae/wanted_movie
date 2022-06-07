import Head from 'next/head'
import dynamic from 'next/dynamic'
import { showNavState } from 'atoms/showNavState'
import { useMe } from '@hooks/user'
import { useRecoilValue } from 'recoil'

import { Variants, motion } from 'framer-motion'

const Nav = dynamic(() => import('./Nav'), { ssr: false })
const Header = dynamic(() => import('./Header'), { ssr: false })
const SideMe = dynamic(() => import('./SideMe'), { ssr: false })
const LoginToastMessage = dynamic(() => import('../LoginToastMessage'), { ssr: false })
const AccountForm = dynamic(() => import('@components/AccountForm'), { ssr: false })
const Portal = dynamic(() => import('@components/Portal'), { ssr: false })

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

const styles = {
  wrapper: 'flex overflow-x-hidden min-h-screen text-white bg-black transition-all',
  container: 'flex flex-col flex-1 min-h-screen',
}

const Layout = ({ children, title, showHeader = true, showNav = true }: IProps) => {
  const showAllNav = useRecoilValue(showNavState)
  const { data } = useMe()
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{title ? `${title} | Wanted Movie App` : 'Wanted Movie App'}</title>
      </Head>
      <div>{showNav && <Nav />}</div>
      <div className={styles.container}>
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
      <SideMe inView={data?.ok as boolean} />
      <Portal>
        <LoginToastMessage />
        <AccountForm />
      </Portal>
    </div>
  )
}

export default Layout
