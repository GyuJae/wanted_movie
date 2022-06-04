import dynamic from 'next/dynamic'
import { useMe } from '@hooks/user'

import { navLibraryItems, navMenuItems } from 'dictionary/navitemDict'

const NavItem = dynamic(() => import('./NavItem'))
const Logout = dynamic(() => import('./Logout'))

const styles = {
  wrapper: 'flex flex-col justify-between h-full',
  container: 'space-y-2',
  menu: 'pl-3 text-xs text-zinc-400',
  libraryContainer: 'py-2',
  library: 'pl-2 text-xs text-zinc-400',
  listContainer: 'mt-2',
  brBar: 'mx-auto mt-7 w-10/12 h-[1px] bg-zinc-700',
}

const NavList = () => {
  const { data } = useMe()
  if (!data) return null
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          <h3 className={styles.menu}>MENU</h3>
          <ul className={styles.listContainer}>
            {navMenuItems.map((item, index) => {
              const key = `${item.categoryName}-${index}`
              return <NavItem key={key} {...item} />
            })}
          </ul>
          <div className={styles.brBar} />
        </div>
        {data.ok && (
          <div className={styles.libraryContainer}>
            <h3 className={styles.library}>LIBRARY</h3>
            <ul className={styles.listContainer}>
              {navLibraryItems.map((item, index) => {
                const key = `${item.categoryName}-${index}`
                return <NavItem key={key} {...item} />
              })}
            </ul>
            <div className={styles.brBar} />
          </div>
        )}
      </div>
      <Logout />
    </div>
  )
}

export default NavList
