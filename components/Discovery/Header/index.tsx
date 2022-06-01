import dynamic from 'next/dynamic'

const Movie = dynamic(() => import('./Movie'))
const TVShow = dynamic(() => import('./TVShow'))

const Header = () => {
  return (
    <div className='flex px-6 pt-0 pb-4 space-x-9 text-sm text-zinc-400 border-b-[1px] border-zinc-800'>
      <Movie />
      <TVShow />
    </div>
  )
}

export default Header
