import dynamic from 'next/dynamic'

const Main = dynamic(() => import('./Main'))
const Cast = dynamic(() => import('./Cast'))
const Recommendations = dynamic(() => import('./Recommendations'))
const Similar = dynamic(() => import('./Similar'))

interface IProps {
  id: string
}

const styles = {
  wrapper: 'w-screen min-h-screen text-white bg-black',
  container: 'w-full py-12 px-10 space-y-10',
}

const MovieDetail = ({ id }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <Main id={id} />
      <div className={styles.container}>
        <Cast id={id} />
        <Recommendations id={id} />
        <Similar id={id} />
      </div>
    </div>
  )
}

export default MovieDetail
