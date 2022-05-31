import { movieDiscoveryState } from 'atoms/discoveryState'
import { useMovies } from '@hooks/movie'
import { useRecoilValue } from 'recoil'

interface IProps {
  inView: boolean
}

const Movies = ({ inView }: IProps) => {
  const cateogry = useRecoilValue(movieDiscoveryState)

  const { data } = useMovies(cateogry)

  if (!inView || !data) return null
  return (
    <div>
      {data.results.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  )
}

export default Movies
