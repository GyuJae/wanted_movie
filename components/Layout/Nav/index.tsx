import BarsIcon from '@components/Icons/BarsIcon'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { showNavState } from 'atoms/showNavState'
import { useRecoilState } from 'recoil'

const NavList = dynamic(() => import('./NavList'))

const styles = {
  wrapper: 'fixed z-20 py-14 h-screen text-zinc-500 bg-zinc-900',
  button: 'absolute top-5 left-[1.1rem] fill-zinc-700 hover:fill-zinc-600',
  barsIcon: 'w-5',
}

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
      className={styles.wrapper}
    >
      <button type='button' onClick={handleClickShow} className={styles.button}>
        <BarsIcon styleClassName={styles.barsIcon} />
      </button>
      <NavList />
    </motion.nav>
  )
}

export default Nav
