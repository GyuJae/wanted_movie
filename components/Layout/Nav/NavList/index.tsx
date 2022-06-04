import dynamic from 'next/dynamic'
import { useMe } from '@hooks/user'

import { navLibraryItems, navMenuItems } from 'dictionary/navitemDict'

const NavItem = dynamic(() => import('./NavItem'))
const Logout = dynamic(() => import('./Logout'))

const NavList = () => {
  const { data } = useMe()
  if (!data) return null
  return (
    <div className='flex flex-col justify-between h-full'>
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
        {data.ok && (
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
        )}
      </div>
      <Logout />
    </div>
  )
}

export default NavList
