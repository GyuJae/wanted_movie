import { IMovieDetail } from 'types/movie'
import { createBookmark } from '@services/bookmark.service'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'

const BookMarkIcon = dynamic(() => import('@components/Icons/BookMarkIcon'))
const PencliIcon = dynamic(() => import('@components/Icons/PencliIcon'))

interface IProps {
  movie: IMovieDetail
}

const FuncItems = ({ movie }: IProps) => {
  const { mutate } = useMutation(['bookmark', 'create'], createBookmark)

  const handleClickBookmark = () => {
    if (!movie.poster_path) return
    mutate({
      mediaType: 'movie',
      mediaId: movie.id,
      posterPath: movie.poster_path,
      title: movie.title,
      releaseDate: movie.release_date,
      vote: movie.vote_average,
    })
  }

  return (
    <div className='flex justify-end px-12 space-x-3'>
      <button
        type='button'
        onClick={handleClickBookmark}
        className='z-20 p-3  bg-zinc-900 hover:bg-zinc-800 rounded-full'
      >
        <BookMarkIcon styleClassname='w-4 h-4 fill-zinc-500 pointer-event-none' />
      </button>
      <button type='button' className='z-20 p-3 bg-zinc-900 hover:bg-zinc-800 rounded-full'>
        <PencliIcon styleClassname='w-4 h-4  fill-zinc-500' />
      </button>
    </div>
  )
}

export default FuncItems
