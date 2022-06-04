import dynamic from 'next/dynamic'
import { mediaTypeState } from '@atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Movies = dynamic(() => import('./Movies'))
const TVShows = dynamic(() => import('./TVShows'))
const SearchForm = dynamic(() => import('./SearchForm'))
const MediaToggle = dynamic(() => import('./MediaToggle'))
const Layout = dynamic(() => import('@components/Layout'))
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'))

const SearchPage = () => {
  const mediaType = useRecoilValue(mediaTypeState)
  return (
    <Layout showHeader={false}>
      <div className='px-4 space-y-4'>
        <div className='flex items-center space-x-4'>
          <CategoryTitle cateogoryName='Search' />
          <MediaToggle />
        </div>
        <SearchForm />
        <Movies inView={mediaType === 'movie'} />
        <TVShows inView={mediaType === 'tv'} />
      </div>
    </Layout>
  )
}

export default SearchPage
