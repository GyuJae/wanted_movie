import dynamic from 'next/dynamic'
import { mediaTypeState } from '@atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Movies = dynamic(() => import('./Movies'), { ssr: false })
const TVShows = dynamic(() => import('./TVShows'), { ssr: false })
const SearchForm = dynamic(() => import('./SearchForm'), { ssr: false })
const MediaToggle = dynamic(() => import('./MediaToggle'), { ssr: false })
const Layout = dynamic(() => import('@components/Layout'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

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
