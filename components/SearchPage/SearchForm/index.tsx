import dynamic from 'next/dynamic'
import { mediaTypeState } from '@atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'

import { SubmitHandler, useForm } from 'react-hook-form'

const SearchIcon = dynamic(() => import('@components/Icons/SearchIcon'))

interface IForm {
  query: string
}

const SearchForm = () => {
  const router = useRouter()
  const mediaType = useRecoilValue(mediaTypeState)
  const { register, handleSubmit } = useForm<IForm>()
  const onSubmit: SubmitHandler<IForm> = ({ query }) => {
    if (!query) return
    router.push(`/search?query=${query}`)
    router.reload()
  }
  return (
    <div className='relative'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          autoComplete='off'
          autoCapitalize='off'
          {...register('query', { required: true })}
          className='py-2 pr-4 pl-10 w-full bg-zinc-800 rounded-full outline-none'
          placeholder={mediaType === 'movie' ? 'Search movies' : 'Search tv shows'}
        />
        <SearchIcon styleClassname='w-4 absolute top-3 left-3 fill-zinc-400' />
      </form>
    </div>
  )
}

export default SearchForm
