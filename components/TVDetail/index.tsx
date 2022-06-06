import dynamic from 'next/dynamic'

const Back = dynamic(() => import('@components/MovieDetail/Back'), { ssr: false })
const Cast = dynamic(() => import('./Cast'), { ssr: false })
const Main = dynamic(() => import('./Main'), { ssr: false })
const Recommendations = dynamic(() => import('./Recommendations'), { ssr: false })
const Similar = dynamic(() => import('./Similar'), { ssr: false })
const DetailLayout = dynamic(() => import('@components/DetailLayout'))

interface IProps {
  id: string
}

const styles = {
  wrapper: 'w-screen min-h-screen text-white bg-black',
  container: 'py-12 px-4 space-y-12',
}

const TVDetail = ({ id }: IProps) => {
  return (
    <DetailLayout>
      <div className={styles.wrapper}>
        <Back />
        <Main id={id} />
        <div className={styles.container}>
          <Cast id={id} />
          <Recommendations id={id} />
          <Similar id={id} />
        </div>
      </div>
    </DetailLayout>
  )
}

export default TVDetail
