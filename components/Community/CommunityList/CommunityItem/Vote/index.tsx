import dynamic from 'next/dynamic'

const StarIcon = dynamic(() => import('@components/Icons/StarIcon'), { ssr: false })
const StarHalfIcon = dynamic(() => import('@components/Icons/StarHalfIcon'), { ssr: false })

interface IProps {
  vote: number
}

const styles = {
  wrapper: 'flex items-center space-x-1 text-sm text-red-600',
  icon: 'w-4 fill-red-600',
}

const Vote = ({ vote }: IProps) => {
  const starCount = Math.floor(vote)
  const halfExist = vote - starCount !== 0
  if (vote === 0) return null
  return (
    <div className={styles.wrapper}>
      {Array(starCount)
        .fill(1)
        .map((value, index) => {
          const key = `star-${value + index}`
          return <StarIcon key={key} styleClassName={styles.icon} />
        })}
      {halfExist && <StarHalfIcon styleClassname={styles.icon} />}
    </div>
  )
}

export default Vote
