import { MovieCategory } from 'types/movie'
import { TMediaType } from 'types/trending'
import { TvCategory } from 'types/tv'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'

import { movieDiscoveryState, tvDiscoveryState } from 'atoms/discoveryState'

const RightArrowIcon = dynamic(() => import('@components/Icons/RightArrowIcon'))

interface IProps {
  mediaType: TMediaType
  category: MovieCategory | TvCategory
}

const styles = {
  container: 'flex items-center space-x-1 text-xs text-zinc-500',
  icon: 'w-3 h-3 fill-zinc-500 mt-1',
}

const SeeMoreBtn = ({ mediaType, category }: IProps) => {
  const router = useRouter()
  const setMovieDiscovery = useSetRecoilState(movieDiscoveryState)
  const setTVDiscovery = useSetRecoilState(tvDiscoveryState)
  const handleClick = () => {
    if (mediaType === 'movie') setMovieDiscovery(category as MovieCategory)
    if (mediaType === 'tv') setTVDiscovery(category as TvCategory)
    router.push('/discovery')
  }
  return (
    <button type='button' onClick={handleClick} className={styles.container}>
      <span>See More</span>
      <RightArrowIcon styleClassname={styles.icon} />
    </button>
  )
}

export default SeeMoreBtn
