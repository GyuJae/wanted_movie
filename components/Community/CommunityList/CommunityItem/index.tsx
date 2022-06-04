import Image from 'next/image'
import { PostWithUser } from 'types/post'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { useRouter } from 'next/router'

interface IProps {
  post: PostWithUser
}

const Avatar = dynamic(() => import('@components/Avatar'))
const Vote = dynamic(() => import('./Vote'))

const CommunityItem = ({ post }: IProps) => {
  const router = useRouter()
  const handleClickMovie = () => router.push(`/${post.mediaType}/${post.mediaId}`)
  return (
    <li className='flex justify-between py-2 px-4 space-x-2'>
      <div className='space-y-1'>
        <div className='flex items-center space-x-2'>
          <Avatar path={post.user.avatar} size='small' />
          <span className='text-sm text-zinc-400'>{post.user.username}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <span>{post.mediaTitle}</span>
          <span className='text-xs text-zinc-500'> - {post.mediaType.toUpperCase()}</span>
        </div>
        <Vote vote={post.vote} />
        <div className='py-5'>
          <span className='text-zinc-300'>{post.text}</span>
        </div>
      </div>
      <button type='button' onClick={handleClickMovie} className='relative mt-2 w-[5.5rem] h-[8rem]'>
        <Image
          src={getImage({ path: post.posterPath, format: 'w300' })}
          layout='fill'
          alt={post.mediaTitle}
          className='object-cover object-top rounded-sm'
        />
      </button>
    </li>
  )
}

export default CommunityItem
