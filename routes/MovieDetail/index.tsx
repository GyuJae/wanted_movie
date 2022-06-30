import { IMovieDetailPage } from 'types/MovieDetail'
import dynamic from 'next/dynamic'

const Back = dynamic(() => import('./Back'), { ssr: false })
const Cast = dynamic(() => import('./Cast'), { ssr: false })
const Main = dynamic(() => import('./Main'), { ssr: false })
const Recommendations = dynamic(() => import('./Recommendations'), { ssr: false })
const Similar = dynamic(() => import('./Similar'), { ssr: false })
const DetailLayout = dynamic(() => import('@components/DetailLayout'), { ssr: false })
const LoginToastMessage = dynamic(() => import('@components/LoginToastMessage'), { ssr: false })

const styles = {
  wrapper: 'w-screen min-h-screen text-white bg-black',
  container: 'w-full py-12 px-4 space-y-10',
}

const MovieDetail = ({ movie, credits, recommendations, similar }: IMovieDetailPage) => {
  return (
    <DetailLayout>
      <LoginToastMessage />
      <div className={styles.wrapper}>
        <Back />
        <Main movie={movie} />
        <div className={styles.container}>
          <Cast credits={credits} />
          <Recommendations recommendations={recommendations} />
          <Similar similar={similar} />
        </div>
      </div>
    </DetailLayout>
  )
}

export default MovieDetail
