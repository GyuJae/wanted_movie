import { tvDiscoveryState } from 'atoms/discoveryState'
import { useRecoilValue } from 'recoil'
import { useTvs } from '@hooks/tv'

interface IProps {
  inView: boolean
}

const TVShows = ({ inView }: IProps) => {
  const cateogry = useRecoilValue(tvDiscoveryState)

  const { data } = useTvs(cateogry)

  if (!inView || !data) return null
  return (
    <div>
      {data.results.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}

export default TVShows
