import { IMovieDetailPage } from 'types/MovieDetail'
import MoviesService from '@services/movies.service'
import dynamic from 'next/dynamic'

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

const MovieDetail = dynamic(() => import('@components/MovieDetail'), { ssr: false })

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context?.params?.id) {
    return {
      props: {},
    }
  }

  const movieServices = new MoviesService()
  const movie = await movieServices.getMovie(context.params.id.toString())
  const credits = await movieServices.getCredits(context.params.id.toString())
  const recommendations = await movieServices.getRecommendations(context.params.id.toString())
  const similar = await movieServices.getSimilar(context.params.id.toString())

  return {
    props: {
      movie,
      credits,
      recommendations,
      similar,
    },
  }
}

const Page: NextPage<IMovieDetailPage> = ({ movie, credits, recommendations, similar }) => {
  return <MovieDetail movie={movie} credits={credits} recommendations={recommendations} similar={similar} />
}

export default Page
