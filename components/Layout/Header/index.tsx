import React from 'react'
import { TMediaTypeState } from 'atoms/mediaTypeState'
import dynamic from 'next/dynamic'

const HeaderItem = dynamic(() => import('./HeaderItem'))

const headerItems: TMediaTypeState[] = ['movie', 'tv', 'person']

const styles = {
  wrapper: 'flex p-4 min-w-full border-b-[1px] border-zinc-800',
  container: 'flex space-x-9 text-sm text-zinc-400',
}

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <ul className={styles.container}>
        {headerItems.map((headerItem, index) => {
          const key = `${headerItem}-${index}`
          return <HeaderItem key={key} itemName={headerItem} />
        })}
      </ul>
    </header>
  )
}

export default Header
