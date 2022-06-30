import dynamic from 'next/dynamic'

import type { GetServerSideProps, NextPage } from 'next'

const CommunityDetail = dynamic(() => import('@components/CommunityDetail'))

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
  return <CommunityDetail postId={id} />
}

export default Page
