import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { useTv } from '@hooks/tv'

const FuncItems = dynamic(() => import('./FuncItems'))

interface IProps {
  id: string
}

const Main = ({ id }: IProps) => {
  const { data } = useTv(id)
  if (!data) return null

  return (
    <div className='w-screen h-full '>
      <div className='flex relative justify-center w-screen h-screen'>
        {data.backdrop_path && (
          <Image
            alt={`backdrop-${data.name}`}
            className='object-fill opacity-30'
            layout='fill'
            src={getImage({ path: data.backdrop_path as string, format: 'w1280' })}
            priority
          />
        )}
        <div className='flex justify-center py-9 space-x-4 w-full'>
          <Image
            alt={`poster-${data.name}`}
            width={400}
            height={450}
            src={getImage({ path: data.poster_path as string, format: 'w780' })}
            className='rounded-xl'
            priority
          />
          <div className='flex flex-col justify-end py-16 space-y-2'>
            <h3 className='text-4xl font-semibold'>
              {data.name}
              {data.first_air_date && (
                <span className='text-3xl font-medium text-zinc-200'>({data.first_air_date.split('-')[0]})</span>
              )}
            </h3>
            <div className='flex space-x-3'>
              <div>{data.first_air_date}</div>
              <div className='flex space-x-2'>
                {data.genres.map((genre, index) => {
                  const key = `${genre.id}-${index}-${genre.name}`
                  return <div key={key}>{genre.name}</div>
                })}
              </div>
              <div className='flex space-x-2'>{data.episode_run_time}min</div>
            </div>
            <div className='font-semibold text-zinc-500 tagline'>{data.tagline}</div>
            <div className='w-[800px]'>
              <span>{data.overview}</span>
            </div>
            <FuncItems tv={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
