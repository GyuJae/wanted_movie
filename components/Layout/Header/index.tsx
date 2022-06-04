import React from 'react'
import { TMediaTypeState } from 'atoms/mediaTypeState'
import dynamic from 'next/dynamic'

const HeaderItem = dynamic(() => import('./HeaderItem'))
const AccountItem = dynamic(() => import('./AccountItem'))

const headerItems: TMediaTypeState[] = ['movie', 'tv']

const styles = {
  header: 'flex justify-between  p-4 px-6 w-screen h-14 border-b-[1px] border-zinc-800',
  listContainer: 'flex space-x-9 text-sm text-zinc-400',
}

const Header = () => {
  return (
    <header className={styles.header}>
      <ul className={styles.listContainer}>
        {headerItems.map((headerItem, index) => {
          const key = `${headerItem}-${index}`
          return <HeaderItem key={key} itemName={headerItem} />
        })}
      </ul>
      <ul>
        <AccountItem />
      </ul>
    </header>
  )
}

export default Header
