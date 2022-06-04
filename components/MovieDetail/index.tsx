import dynamic from 'next/dynamic'

const Back = dynamic(() => import('./Back'))
const Cast = dynamic(() => import('./Cast'))
const Main = dynamic(() => import('./Main'))
const Recommendations = dynamic(() => import('./Recommendations'))
const Similar = dynamic(() => import('./Similar'))
const DetailLayout = dynamic(() => import('@components/DetailLayout'))

interface IProps {
  id: string
}

const styles = {
  wrapper: 'w-screen min-h-screen text-white bg-black',
  container: 'w-full py-12 px-4 space-y-10',
}

const MovieDetail = ({ id }: IProps) => {
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

export default MovieDetail
