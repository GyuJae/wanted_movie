import ExclamationIcon from '@components/Icons/ExclamationIcon'
import Layout from '@components/Layout'
import RotateIcon from '@components/Icons/RotateIcon'

interface IProps {
  resetErrorBoundary: (...args: unknown[]) => void
}

const Error = ({ resetErrorBoundary }: IProps) => {
  return (
    <Layout title='Error' showHeader={false} showNav={false}>
      <div className='flex flex-col items-center py-20 px-4 m-auto space-y-2 w-2/3 h-1/2 bg-zinc-900 rounded-xl'>
        <div>
          <ExclamationIcon styleClassName='w-20 h-20 fill-zinc-700' />
        </div>

        <div className='flex flex-col items-center space-y-2'>
          <span className='text-3xl font-semibold text-red-500'>Whoops!</span>
          <span className='text-base text-zinc-400'>{`Something went wrong. Lets's give this anthor try`}</span>
        </div>
        <button
          className='flex justify-between items-center py-1 px-5 space-x-2 text-sm text-zinc-200 bg-red-800 rounded-3xl'
          type='button'
          onClick={() => resetErrorBoundary()}
        >
          <span>Try again</span>
          <RotateIcon styleClassName='w-4 h-4 fill-zinc-200 mt-1' />
        </button>
      </div>
    </Layout>
  )
}

export default Error
