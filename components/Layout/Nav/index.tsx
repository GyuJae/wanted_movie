import dynamic from 'next/dynamic'
import { navItems } from 'dictionary/navitemDict'

const NavItem = dynamic(() => import('./NavItem'), { ssr: false })

const styles = {
  wrapper: 'fixed z-20 py-14 pl-4 w-16 min-h-screen text-zinc-500 bg-zinc-900 transition-all lg:w-48',
  categoryTitle: 'text-xs text-zinc-400',
  categoryContainer: 'mt-5 space-y-4',
}

const Nav = () => {
  return (
    <nav className={styles.wrapper}>
      <div>
        <h3 className={styles.categoryTitle}>Menu</h3>
        <ul className={styles.categoryContainer}>
          {navItems.map((item, index) => {
            const key = `${item.categoryName}-${index}`
            return <NavItem key={key} {...item} />
          })}
        </ul>
        <div className='mt-7 w-11/12 h-[1px] bg-zinc-700' />
      </div>
    </nav>
  )
}

export default Nav
