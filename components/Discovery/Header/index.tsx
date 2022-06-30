import dynamic from 'next/dynamic'

const Movie = dynamic(() => import('./Movies'), { ssr: false })
const TVShow = dynamic(() => import('./TVShow'), { ssr: false })

const styles = {
  wrapper: 'flex px-6 pt-0 pb-4 space-x-9 text-sm text-zinc-400 border-b-[1px] border-zinc-800',
}

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <Movie />
      <TVShow />
    </div>
  )
}

export default Header
