import { TMediaType } from 'types/trending'
import { useRouter } from 'next/router'

interface IProps {
  mediaType: TMediaType
  mediaId: number
}

const styles = {
  button:
    'flex z-10 justify-center py-2 px-1 min-w-[4.8rem] text-[10px] font-medium bg-red-600/60 hover:bg-red-600/70 rounded-full',
}

const ReadMoreBtn = ({ mediaType, mediaId }: IProps) => {
  const router = useRouter()

  const handleClick = () => router.push(`/${mediaType}/${mediaId}`)

  return (
    <button type='button' onClick={handleClick} className={styles.button}>
      Read more
    </button>
  )
}

export default ReadMoreBtn
