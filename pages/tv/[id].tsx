import { ITVDetailPage } from 'types/TVDetail'
import TvsService from '@services/tvs.service'
import dynamic from 'next/dynamic'

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

const TVDetail = dynamic(() => import('routes/TVDetail'), { ssr: false })

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

  const tvServices = new TvsService()
  const tv = await tvServices.getTV(context.params.id.toString())
  const credits = await tvServices.getCredits(context.params.id.toString())
  const recommendations = await tvServices.getRecommendations(context.params.id.toString())
  const similar = await tvServices.getSimilar(context.params.id.toString())

  return {
    props: {
      tv,
      credits,
      recommendations,
      similar,
    },
    revalidate: 60 * 60 * 24 * 30,
  }
}

const Page: NextPage<ITVDetailPage> = ({ tv, credits, recommendations, similar }) => {
  return <TVDetail tv={tv} credits={credits} recommendations={recommendations} similar={similar} />
}

export default Page
