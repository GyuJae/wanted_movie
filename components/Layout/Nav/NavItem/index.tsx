/* eslint-disable jsx-a11y/anchor-is-valid */
import HouseIcon from '@components/Icons/HouseIcon'
import Link from 'next/link'
import UsersIcon from '@components/Icons/UsersIcon'
import classNames from 'classnames'
import { useRouter } from 'next/router'

interface IProps {
  categoryPathname: string
  categoryName: string
}

const styles = {
  category: (pathname: string, categoryPathname: string) =>
    classNames('relative flex pl-4 py-3 justify-center items-center lg:justify-start hover:bg-zinc-800', {
      'text-white font-semibold fill-red-600': pathname === categoryPathname,
      'fill-zinc-600': pathname !== categoryPathname,
    }),
  categoryName: 'hidden pr-5 lg:block',
  categoryIcon: 'mr-4 w-5',
}

const NavItem = ({ categoryPathname, categoryName }: IProps) => {
  const symbolIcon = {
    Home: <HouseIcon styleClassName={styles.categoryIcon} />,
    Community: <UsersIcon styleClassName={styles.categoryIcon} />,
  }[categoryName]

  const { pathname } = useRouter()

  return (
    <div>
      <Link href={categoryPathname}>
        <a>
          <li className={styles.category(pathname, categoryPathname)}>
            {symbolIcon}
            <span className={styles.categoryName}>{categoryName}</span>
            {pathname === categoryPathname && (
              <div className='hidden absolute right-0 w-1 h-5 bg-red-600 rounded-l-md lg:block' />
            )}
          </li>
        </a>
      </Link>
    </div>
  )
}

export default NavItem
