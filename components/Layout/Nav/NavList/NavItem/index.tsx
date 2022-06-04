/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { opacityVariants } from '@animations/variants'
import { showNavState } from 'atoms/showNavState'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'

import { AnimatePresence, motion } from 'framer-motion'

const CompassIcon = dynamic(() => import('@components/Icons/CompassIcon'))
const HouseIcon = dynamic(() => import('@components/Icons/HouseIcon'))
const UsersIcon = dynamic(() => import('@components/Icons/UsersIcon'))
const ClockIcon = dynamic(() => import('@components/Icons/ClockIcon'))
const BookMarkIcon = dynamic(() => import('@components/Icons/BookMarkIcon'))
const SearchIcon = dynamic(() => import('@components/Icons/SearchIcon'))

interface IProps {
  categoryPathname: string
  categoryName: string
}

const styles = {
  item: (current: boolean) =>
    classNames('relative flex pl-5 mt-1  space-x-3 h-12 justify-start items-center text-sm hover:bg-zinc-800', {
      'text-white font-semibold fill-red-600': current,
      'fill-zinc-600': !current,
    }),
  redBar: 'absolute right-0 w-1 h-5 bg-red-600 rounded-l-md',
  categoryName: 'pr-5',
}

const NavItem = ({ categoryPathname, categoryName }: IProps) => {
  const symbolIcon = {
    Home: <HouseIcon styleClassName='w-5' />,
    Community: <UsersIcon styleClassName='w-5' />,
    Discovery: <CompassIcon styleClassName='w-5' />,
    Recent: <ClockIcon styleClassname='w-5' />,
    Bookmarked: <BookMarkIcon styleClassname='w-4' />,
    Search: <SearchIcon styleClassname='w-5' />,
  }[categoryName]

  const { pathname } = useRouter()

  const showItem = useRecoilValue(showNavState)

  return (
    <Link href={categoryPathname}>
      <a>
        <li className={styles.item(pathname === categoryPathname)}>
          <div>{symbolIcon}</div>
          <AnimatePresence>
            {showItem && (
              <motion.span
                variants={opacityVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                className={styles.categoryName}
              >
                {categoryName}
              </motion.span>
            )}
          </AnimatePresence>
          {pathname === categoryPathname && showItem && <div className={styles.redBar} />}
        </li>
      </a>
    </Link>
  )
}

export default NavItem
