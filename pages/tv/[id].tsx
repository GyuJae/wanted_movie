import TVDetail from '@components/TVDetail'

import type { GetServerSideProps, NextPage } from 'next'

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
  return <TVDetail id={id} />
}

export default Page
