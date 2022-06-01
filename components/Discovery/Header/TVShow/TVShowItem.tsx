import { MouseEvent } from 'react'
import { TvCategory } from 'types/tv'
import { tvCategoryDict } from 'dictionary/discoveryCategory'

interface IProps {
  inView: boolean
  handleSelectCategory: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
}

const items: TvCategory[] = ['top_rated', 'popular', 'airing_today', 'on_the_air']

const TVShowItem = ({ inView, handleSelectCategory }: IProps) => {
  if (!inView) return null
  return (
    <div className='absolute top-8 z-10 py-2 w-24 text-sm bg-zinc-800 rounded-md'>
      {items.map((item, index) => {
        const key = `tv-${item}-${index}`
        return (
          <button
            key={key}
            value={item}
            onClick={handleSelectCategory}
            type='button'
            className='py-1 px-2 w-full text-left hover:bg-zinc-900'
          >
            {tvCategoryDict[item]}
          </button>
        )
      })}
    </div>
  )
}

export default TVShowItem
