import { IMovie } from 'types/movie'
import { ITV } from 'types/tv'
import { TMediaType } from 'types/trending'
import dynamic from 'next/dynamic'

import { Bookmark, RecentView } from '@prisma/client'

const TVShow = dynamic(() => import('./TVShow'))
const Movie = dynamic(() => import('./Movie'))

interface IProps {
  mediaType: TMediaType
  mediaId: number
  media: IMovie | ITV | Bookmark | RecentView
}

const ReadMoreBtn = ({ mediaType, mediaId, media }: IProps) => {
  return (
    <div>
      <TVShow mediaType={mediaType} mediaId={mediaId} media={media as ITV} inView={mediaType === 'tv'} />
      <Movie mediaType={mediaType} mediaId={mediaId} media={media as IMovie} inView={mediaType === 'movie'} />
    </div>
  )
}

export default ReadMoreBtn
