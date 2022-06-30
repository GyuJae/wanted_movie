import type { NextPage } from 'next'
import { PostWithUserAndCount } from 'types/post'
import client from '@libs/client'
import dynamic from 'next/dynamic'

const Community = dynamic(() => import('@components/Community'), { ssr: false })

interface IProps {
  posts?: PostWithUserAndCount[]
}

export async function getStaticProps() {
  const posts = await client?.post.findMany({
    include: {
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
      _count: {
        select: {
          Like: true,
          Comment: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}

const CommunityPage: NextPage<IProps> = ({ posts }) => {
  return <Community posts={posts} />
}

export default CommunityPage
