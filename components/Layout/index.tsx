import Head from 'next/head'
import dynamic from 'next/dynamic'
import { showNavState } from 'atoms/showNavState'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'

import { AnimatePresence, Variants, motion } from 'framer-motion'

const Nav = dynamic(() => import('./Nav'))
const Header = dynamic(() => import('./Header'))

interface IProps {
  title?: string
  showHeader?: boolean
  showNav?: boolean
  children: React.ReactNode
}

const sideVariants: Variants = {
  initial: {
    x: 400,
  },
  animate: {
    x: 0,
  },
  exit: {
    x: 400,
  },
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
  const [showSide, setShowSide] = useState<boolean>(false)
  const showAllNav = useRecoilValue(showNavState)

  const handleClickSide = () => setShowSide((prev) => !prev)

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
      <AnimatePresence initial={false}>
        {showSide && (
          <motion.div
            className='fixed right-0 z-20 w-72 h-screen bg-zinc-900'
            variants={sideVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{
              type: 'tween',
            }}
          />
        )}
      </AnimatePresence>
      {/* <button
        type='button'
        onClick={handleClickSide}
        className='fixed top-1/2 right-1/2 w-20 h-20 bg-rose-700 rounded-full '
      >
        helo
      </button> */}
    </div>
  )
}

export default Layout
