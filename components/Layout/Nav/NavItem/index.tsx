/* eslint-disable jsx-a11y/anchor-is-valid */
import CompassIcon from '@components/Icons/CompassIcon'
import HouseIcon from '@components/Icons/HouseIcon'
import Link from 'next/link'
import UsersIcon from '@components/Icons/UsersIcon'
import classNames from 'classnames'
import { showNavState } from 'atoms/showNavState'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'

import { AnimatePresence, Variants, motion } from 'framer-motion'

interface IProps {
  categoryPathname: string
  categoryName: string
}

const variants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

const NavItem = ({ categoryPathname, categoryName }: IProps) => {
  const symbolIcon = {
    Home: <HouseIcon styleClassName='w-6' />,
    Community: <UsersIcon styleClassName='w-6' />,
    Discovery: <CompassIcon styleClassName='w-6' />,
  }[categoryName]

  const { pathname } = useRouter()

  const showItem = useRecoilValue(showNavState)

  return (
    <Link href={categoryPathname}>
      <a>
        <li
          className={classNames('relative flex pl-4 mt-1 space-x-3 h-12 justify-start items-center hover:bg-zinc-800', {
            'text-white font-semibold fill-red-600': pathname === categoryPathname,
            'fill-zinc-600': pathname !== categoryPathname,
          })}
        >
          <div>{symbolIcon}</div>
          <AnimatePresence>
            {showItem && (
              <motion.span variants={variants} initial='initial' animate='animate' exit='exit' className='pr-5'>
                {categoryName}
              </motion.span>
            )}
          </AnimatePresence>
          {pathname === categoryPathname && showItem && (
            <div className='absolute right-0 w-1 h-5 bg-red-600 rounded-l-md' />
          )}
        </li>
      </a>
    </Link>
  )
}

export default NavItem
