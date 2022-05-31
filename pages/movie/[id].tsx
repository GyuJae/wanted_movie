import dynamic from 'next/dynamic'

import type { GetServerSideProps, NextPage } from 'next'

const MovieDetail = dynamic(() => import('@components/MovieDetail'))

interface IProps {
  id: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { id },
  } = context
  return {
    props: {
      id,
    },
  }
}

const Page: NextPage<IProps> = ({ id }) => {
  return <MovieDetail id={id} />
}

export default Page
