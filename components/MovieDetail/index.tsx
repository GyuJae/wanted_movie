import dynamic from 'next/dynamic'

const Main = dynamic(() => import('./Main'))
const Cast = dynamic(() => import('./Cast'))
const Recommendations = dynamic(() => import('./Recommendations'))
const Similar = dynamic(() => import('./Similar'))

interface IProps {
  id: string
}

const MovieDetail = ({ id }: IProps) => {
  return (
    <div className=' w-screen h-full text-white bg-black'>
      <Main id={id} />
      <div className='py-12 px-10 space-y-12'>
        <Cast id={id} />
        <Recommendations id={id} />
        <Similar id={id} />
      </div>
    </div>
  )
}

export default MovieDetail
