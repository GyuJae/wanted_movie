import Image from 'next/image'

interface IProps {
  path: string | null
}
const Avatar = ({ path }: IProps) => {
  if (!path) return <div className='relative w-12 h-12 bg-zinc-700 rounded-full' />
  return (
    <div className='relative w-12 h-12 bg-zinc-700 rounded-full'>
      <Image src={path} layout='fill' alt='avatar' priority />
    </div>
  )
}

export default Avatar
