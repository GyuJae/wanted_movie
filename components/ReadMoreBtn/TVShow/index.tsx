import { ITV } from 'types/tv'
import { TMediaType } from 'types/trending'
import { createRecentView } from '@services/recentView.service'
import { useMe } from '@hooks/user'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'

interface IProps {
  inView: boolean
  mediaType: TMediaType
  mediaId: number
  media: ITV
}

const styles = {
  button:
    'flex z-10 justify-center py-2 px-1 min-w-[4.8rem] text-[10px] font-medium bg-red-600/60 hover:bg-red-600/70 rounded-full',
}

const TVShows = ({ mediaType, mediaId, media, inView }: IProps) => {
  const router = useRouter()
  const { data } = useMe()
  const { mutate } = useMutation(['recentView', 'create'], createRecentView)
  const handleClick = () => {
    if (data?.ok && data.user && media.poster_path) {
      mutate({
        mediaType,
        mediaId,
        posterPath: media.poster_path,
        title: media.name,
        releaseDate: media.first_air_date,
        vote: media.vote_average,
      })
    }
    router.push(`/${mediaType}/${mediaId}`).then(() => router.reload())
  }

  if (!inView) return null

  return (
    <button type='button' onClick={handleClick} className={styles.button}>
      Read more
    </button>
  )
}

export default TVShows
