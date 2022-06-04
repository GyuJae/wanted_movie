import dynamic from 'next/dynamic'

const Back = dynamic(() => import('./Back'))
const Cast = dynamic(() => import('./Cast'))
const Main = dynamic(() => import('./Main'))
const Recommendations = dynamic(() => import('./Recommendations'))
const Similar = dynamic(() => import('./Similar'))

interface IProps {
  id: string
}

const styles = {
  wrapper: 'w-screen min-h-screen text-white bg-black',
  container: 'py-12 px-4 space-y-12',
}

const TVDetail = ({ id }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <Back />
      <Main id={id} />
      <div className={styles.container}>
        <Cast id={id} />
        <Recommendations id={id} />
        <Similar id={id} />
      </div>
    </div>
  )
}

export default TVDetail
