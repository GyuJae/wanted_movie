import dynamic from 'next/dynamic'

const SkeletonItem = dynamic(() => import('./SkeletonItem'))

interface IProps {
  inView: boolean
}

const styles = {
  wrapper:
    'grid grid-cols-2 gap-4 justify-center py-4 pb-10 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
}

const Skeleton = ({ inView }: IProps) => {
  if (!inView) return null
  return (
    <div className={styles.wrapper}>
      {Array(10)
        .fill(1)
        .map((item, index) => {
          const key = `discovery-loading-${item + index}`
          return <SkeletonItem key={key} />
        })}
    </div>
  )
}

export default Skeleton
