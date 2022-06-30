import { ITVDetailPage } from 'types/TVDetail'
import dynamic from 'next/dynamic'

const Back = dynamic(() => import('@components/MovieDetail/Back'), { ssr: false })
const Cast = dynamic(() => import('./Cast'), { ssr: false })
const Main = dynamic(() => import('./Main'), { ssr: false })
const Recommendations = dynamic(() => import('./Recommendations'), { ssr: false })
const Similar = dynamic(() => import('./Similar'), { ssr: false })
const DetailLayout = dynamic(() => import('@components/DetailLayout'))

const styles = {
  wrapper: 'w-screen min-h-screen text-white bg-black',
  container: 'py-12 px-4 space-y-12',
}

const TVDetail = ({ tv, credits, recommendations, similar }: ITVDetailPage) => {
  return (
    <DetailLayout>
      <div className={styles.wrapper}>
        <Back />
        <Main tv={tv} />
        <div className={styles.container}>
          <Cast credits={credits} />
          <Recommendations recommendations={recommendations} />
          <Similar similar={similar} />
        </div>
      </div>
    </DetailLayout>
  )
}

export default TVDetail
