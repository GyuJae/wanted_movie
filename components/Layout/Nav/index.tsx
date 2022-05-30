import BarsIcon from '@components/Icons/BarsIcon'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { navItems } from 'dictionary/navitemDict'
import { showNavState } from 'atoms/showNavState'
import { useRecoilState } from 'recoil'

const NavItem = dynamic(() => import('./NavItem'), { ssr: false })

const Nav = () => {
  const [show, setShow] = useRecoilState(showNavState)

  const handleClickShow = () => setShow((prev) => !prev)

  return (
    <motion.nav
      animate={{
        width: show ? '200px' : '57px',
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
      <div>
        <h3 className='ml-3 text-xs text-zinc-400'>Menu</h3>
        <ul className='mt-5'>
          {navItems.map((item, index) => {
            const key = `${item.categoryName}-${index}`
            return <NavItem key={key} {...item} />
          })}
        </ul>
        <div className='mx-auto mt-7 w-11/12 h-[1px] bg-zinc-700' />
      </div>
    </motion.nav>
  )
}

export default Nav
