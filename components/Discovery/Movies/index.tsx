import dynamic from 'next/dynamic'
import { movieDiscoveryState } from 'atoms/discoveryState'
import { useMovies } from '@hooks/movie'
import { useRecoilValue } from 'recoil'

const MovieGenres = dynamic(() => import('../MovieGenres'))

interface IProps {
  inView: boolean
}

const Movies = ({ inView }: IProps) => {
  const cateogry = useRecoilValue(movieDiscoveryState)

  const { data } = useMovies(cateogry)

  if (!inView || !data) return null
  return (
    <div className='px-4 pb-10'>
      <MovieGenres />
      {data.results.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  )
}

export default Movies
