import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { loginToastMessageState } from '@atoms/loginToastMessageState'
import { opacityVariants } from '@animations/variants'
import { showNavState } from 'atoms/showNavState'
import { useMe } from '@hooks/user'
import { useRouter } from 'next/router'

import { AnimatePresence, motion } from 'framer-motion'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const CompassIcon = dynamic(() => import('@components/Icons/CompassIcon'), { ssr: false })
const HouseIcon = dynamic(() => import('@components/Icons/HouseIcon'), { ssr: false })
const UsersIcon = dynamic(() => import('@components/Icons/UsersIcon'), { ssr: false })
const ClockIcon = dynamic(() => import('@components/Icons/ClockIcon'), { ssr: false })
const BookMarkIcon = dynamic(() => import('@components/Icons/BookMarkIcon'), { ssr: false })
const SearchIcon = dynamic(() => import('@components/Icons/SearchIcon'), { ssr: false })

interface IProps {
  categoryPathname: string
  categoryName: string
}

const styles = {
  item: (current: boolean) =>
    classNames('relative flex w-full pl-5 mt-1  space-x-3 h-12 justify-start items-center text-sm hover:bg-zinc-800', {
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

  const router = useRouter()
  const { pathname } = router
  const setLoginToastMessage = useSetRecoilState(loginToastMessageState)
  const { data } = useMe()
  const showItem = useRecoilValue(showNavState)

  const handleClickPathname = () => {
    if (categoryName === 'Community' && (!data || !data.ok)) {
      setLoginToastMessage(true)
      return
    }
    router.push(categoryPathname)
  }

  return (
    <li>
      <button type='button' onClick={handleClickPathname} className={styles.item(pathname === categoryPathname)}>
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
      </button>
    </li>
  )
}

export default NavItem
