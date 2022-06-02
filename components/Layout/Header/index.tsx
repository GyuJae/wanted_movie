import React from 'react'
import { TMediaTypeState } from 'atoms/mediaTypeState'
import dynamic from 'next/dynamic'

const HeaderItem = dynamic(() => import('./HeaderItem'))
const AccountItem = dynamic(() => import('./AccountItem'))

const headerItems: TMediaTypeState[] = ['movie', 'tv']

const Header = () => {
  return (
    <header className='flex justify-between p-4 px-6 w-screen border-b-[1px] border-zinc-800'>
      <ul className='flex space-x-9 text-sm text-zinc-400'>
        {headerItems.map((headerItem, index) => {
          const key = `${headerItem}-${index}`
          return <HeaderItem key={key} itemName={headerItem} />
        })}
      </ul>

      <AccountItem />
    </header>
  )
}

export default Header
