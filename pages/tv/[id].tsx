import dynamic from 'next/dynamic'

import type { GetServerSideProps, NextPage } from 'next'

const TVDetail = dynamic(() => import('@components/TVDetail'), { ssr: false })

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
