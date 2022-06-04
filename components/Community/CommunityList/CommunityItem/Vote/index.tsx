import dynamic from 'next/dynamic'

const StarIcon = dynamic(() => import('@components/Icons/StarIcon'))
const StarHalfIcon = dynamic(() => import('@components/Icons/StarHalfIcon'))

interface IProps {
  vote: number
}
const Vote = ({ vote }: IProps) => {
  const starCount = Math.floor(vote)
  const halfExist = vote - starCount !== 0
  if (vote === 0) return null
  return (
    <div className='flex items-center space-x-1 text-sm text-red-600'>
      {Array(starCount)
        .fill(1)
        .map((value, index) => {
          const key = `star-${value + index}`
          return <StarIcon key={key} styleClassName='w-4 fill-red-600' />
        })}
      {halfExist && <StarHalfIcon styleClassname='w-4 fill-red-600' />}
    </div>
  )
}

export default Vote
