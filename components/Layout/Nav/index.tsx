import BarsIcon from '@components/Icons/BarsIcon'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { showNavState } from 'atoms/showNavState'
import { useRecoilState } from 'recoil'

import { navLibraryItems, navMenuItems } from 'dictionary/navitemDict'

const NavItem = dynamic(() => import('./NavItem'))

const Nav = () => {
  const [show, setShow] = useRecoilState(showNavState)

  const handleClickShow = () => setShow((prev) => !prev)

  return (
    <motion.nav
      animate={{
        width: show ? '200px' : '62px',
      }}
      transition={{
        type: 'tween',
      }}
      initial={false}
      className={classNames('fixed z-20 py-14 h-screen text-zinc-500 bg-zinc-900')}
    >
      <button
        type='button'
        onClick={handleClickShow}
        className='absolute top-5 left-[1.1rem] fill-zinc-700 hover:fill-zinc-600'
      >
        <BarsIcon styleClassName='w-5' />
      </button>
      <div className='space-y-2'>
        <div>
          <h3 className='pl-3 text-xs text-zinc-400'>MENU</h3>
          <ul className='mt-2'>
            {navMenuItems.map((item, index) => {
              const key = `${item.categoryName}-${index}`
              return <NavItem key={key} {...item} />
            })}
          </ul>
          <div className='mx-auto mt-7 w-10/12 h-[1px] bg-zinc-700' />
        </div>
        <div className='py-2'>
          <h3 className='pl-2 text-xs text-zinc-400'>LIBRARY</h3>
          <ul className='mt-2'>
            {navLibraryItems.map((item, index) => {
              const key = `${item.categoryName}-${index}`
              return <NavItem key={key} {...item} />
            })}
          </ul>
          <div className='mx-auto mt-7 w-10/12 h-[1px] bg-zinc-700' />
        </div>
      </div>
    </motion.nav>
  )
}

export default Nav
