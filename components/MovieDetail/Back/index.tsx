import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const LeftArrow = dynamic(() => import('@components/Icons/LeftArrow'), { ssr: false })

const Back = () => {
  const router = useRouter()
  const handleClick = () => router.back()
  return (
    <button type='button' onClick={handleClick} className='absolute top-4 left-4 z-20'>
      <LeftArrow styleClassname='w-4 fill-zinc-700' />
    </button>
  )
}

export default Back
