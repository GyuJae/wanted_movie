# 🔥 Wanted 개인과제 - 영화 웹 만들기

<img src="https://user-images.githubusercontent.com/58322754/173046920-ff824be2-023c-4cb8-97d7-9a6e66b470ea.png">

- **Github Repository URL** <br/> https://github.com/GyuJae/wanted_movie
- **배포 URL** <br/> https://wanted-movie-gyujae.vercel.app/

<br/>

# 🗂 프로젝트 소개
- **개발 기간** 22.06.01 - 22.06.05
- **개발자** 정규재
- **프로젝트 개요** <br/>
본 프로젝트는 원티드 프리온보딩 프론트엔드 4차 코스 마지막 개인과제로 영화 Api와 NextJS를 활용한 영화 웹사이트 입니다.

<br/>

# 🔨 기술 스택

|라이브러리|내용|
|:---:|:---:|
| NextJS | 웹 프레임워크| 
| react query | data fetching| 
| axios | data fetching| 
| react-use | 다양한 리액트 Hooks| 
| classnames | styles  |
| react-error-boundary | error boundary  |
| framer-motion | 애니메이션  |
| tailwind css | css 라이브러리  |
| react-hook-form | form 라이브러리  |
| iron session | session |
| Recoil | 상태관리 |
| Prisma | Data ORM |
| PlanetScale | My SQL platform |
| Cloudflare | CDN Service |
| Vercel | Deploy |

<br/>


# 🏞 기능 설명 


### Carousel

<details>
    <summary>구현 방법</summary>


Framer motion 라이브러리를 이용하여 drag를 사용해서 옆에서 영화들을 볼 수 있도록 하였습니다.
<br />
```tsx
<AnimatePresence exitBeforeEnter>
  <motion.div
    variants={opacityVariants}
    initial='initial'
    animate='animate'
    exit='exit'
    className={styles.wrapper}
    whileTap={{ cursor: 'grabbing' }}
  >
    <motion.div
      drag='x'
      dragElastic={0.01}
      dragConstraints={{ right: 0, left: -totalWidth }}
      className={styles.container}
    >
      {children}
    </motion.div>
  </motion.div>
</AnimatePresence>
```
</details>

<br />

### Data Fetching

<details>
    <summary>구현 방법</summary>

React query를 이용하여 data fetch 했으며 service 파일과 hooks파일로 따로 나누어 간편히 데이터를 불러 올수 있도록 하였습니다.

```ts
const services = new MoviesService()

export const useMovies = (category: MovieCategory) => {
  return useQuery<IMovieResult, Error>(['movies', category], () => services.getMovies(category))
}

export const useMovie = (id: string) => {
  return useQuery<IMovieDetail, Error>(['movie', id], () => services.getMovie(id))
}

export const useMovieRecommendations = (id: string) => {
  return useQuery<IMovieResult, Error>(['movie', id, 'recommendations'], () => services.getRecommendations(id))
}

export const useMovieCredits = (id: string) => {
  return useQuery<IMovieCredits, Error>(['movie', id, 'credits'], () => services.getCredits(id))
}

export const useMovieSimilar = (id: string) => {
  return useQuery<IMovieResult, Error>(['movie', id, 'similar'], () => services.getSimilar(id))
}

export const useMovieGenres = () => {
  return useQuery<IMovieGenres, Error>(['movie', 'genres'], () => services.getGenres())
}

export const useInfiniteMovies = (category: MovieCategory) => {
  return useInfiniteQuery<IMovieResult, Error>(
    ['movies', category],
    ({ pageParam = 1 }) => services.getPageMovies({ category, pageParam }),
    {
      getNextPageParam: (lastPage: IMovieResult) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1
        return undefined
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    }
  )
}

export const useInfiniteSearchMovies = (query: string) => {
  return useInfiniteQuery<IMovieResult, Error>(
    ['movies', 'search', query],
    ({ pageParam = 1 }) => services.getSearch({ query, pageParam }),
    {
      getNextPageParam: (lastPage: IMovieResult) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1
        return undefined
      },
      enabled: !!query,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    }
  )
}

export const useSearchKeyword = (query: string) => {
  return useQuery<ISearchKeywordResult, Error>(['search', 'keyword', query], () => services.getSearchKeyword(query), {
    enabled: !!query,
  })
}
```

</details>

<br/>

### CRUD Apis

<details>
    <summary>구현 방법</summary>

NextJs 웹 프레임 워크의 기능로 백엔드 CRUD Api를만들었습니다. 데이터는 PlanetScale에 저장했으며 data ORM으로 prisma를 사용하며 사진은 Cloudflare를 이용하여 올렸습니다. 구현한 기능으로는 로그인기능, avatar 사진 올리기, bookmark 저장하기, 최근 본 기록 저장하기, 영화 Comment 달기 등을 구현했습니다.

#### Prisma & PlanetScale
```prisma


generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["referentialIntegrity"]
}

datasource db {
  provider             = "mysql"
  url                  = env("DATABASE_URL")
  referentialIntegrity = "prisma"
}

model User {
  id         Int          @id @default(autoincrement())
  createdAt  DateTime     @default(now())
  updatedAt  DateTime     @updatedAt
  email      String       @unique
  username   String       @unique
  password   String
  avatar     String?
  Post       Post[]
  Bookmark   Bookmark[]
  RecentView RecentView[]
}

model Post {
  id         Int      @id @default(autoincrement())
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId     Int
  text       String   @db.LongText
  mediaType  Media
  mediaId    Int
  posterPath String
  mediaTitle String
  vote       Float
}

model Bookmark {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      Int
  mediaType   Media
  mediaId     Int
  posterPath  String
  title       String
  releaseDate String
  vote        Float

  @@unique([userId, mediaId])
}

model RecentView {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      Int
  mediaType   Media
  mediaId     Int
  posterPath  String
  title       String
  releaseDate String
  vote        Float

  @@unique([userId, mediaId])
}

enum Media {
  movie
  tv
}

```

#### Apis

```ts
import prisma from '@libs/client'

import * as bcrypt from 'bcrypt'

import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { IResponse } from '@libs/withHandler'

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  try {
    const {
      body: { email, password, username },
    } = req
    const existEmail = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    })
    if (existEmail) {
      return res.json({
        ok: false,
        error: 'This email already exists.',
      })
    }
    const existUsername = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    })
    if (existUsername) {
      return res.json({
        ok: false,
        error: 'This username already exists.',
      })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: {
        email,
        username,
        password: hashPassword,
      },
    })
    return res.json({
      ok: true,
    })
  } catch (error) {
    return res.json({
      ok: false,
      error: error as string,
    })
  }
}

export default withHandler({ methods: ['POST'], handler, isPrivate: false })

```
</details>

<br/>

### Cloudflare

<details>
  <summary>구현 방법</summary>

<img src='https://user-images.githubusercontent.com/58322754/172020949-6b4330dd-3a72-4741-9d96-a68ed0ce90be.png' >

```tsx
const { mutate } = useMutation(['user', 'me', 'edit'], edit, {
    onSuccess: ({ ok, error }: IResponse) => {
      if (ok) {
        queryClient.refetchQueries(['user', 'me'])
        handleCloseEditForm()
      }
      if (!ok && error) setFormError(error)
    },
  })

const onSubmit: SubmitHandler<IForm> = async ({ username, avatarFile }) => {
  if (avatarFile && avatarFile.length > 0) {
    const { uploadURL } = await (await fetch('/api/files')).json()
    const form = new FormData()
    form.append('file', avatarFile[0], `${data?.user?.id}-avatar-${username}`)
    const {
      result: { id },
    } = await (
      await fetch(uploadURL, {
        method: 'POST',
        body: form,
      })
    ).json()
    mutate({ username, avatarId: id })
  } else {
    mutate({ username })
  }
}

useEffect(() => {
  if (data?.user?.username) setValue('username', data.user.username)
}, [data?.user?.username, setValue])

const [avatarPreview, setAvatarPreview] = useState<string | null>(
  data?.user?.avatar ? fileToUrl({ path: data.user.avatar, variant: 'avatar' }) : null
)
const avatar = watch('avatarFile')
useEffect(() => {
  if (avatar && avatar.length > 0) {
    const file = avatar[0]
    setAvatarPreview(URL.createObjectURL(file))
  }
}, [avatar])

```
</details>


<br/>

### INCREMENTAL SITE REGENERATION

<details>
  <summary>구현 방법</summary>

ISR을 사용하면 "전체 사이트를 다시 build할 필요 없이" 각각의 페이지별로 static-generation을 사용할 수 있습니다. ISR을 사용하면 수백만 페이지로 확장하면서 static의 이점을 유지할 수 있습니다.


```tsx
export async function getStaticProps() {
  const trendingsService = new TrendingsService()
  const movieServices = new MoviesService()
  const tvServices = new TvsService()

  const trendingDayMovies = await trendingsService.getTrendings('movie', 'day')
  const trendingWeekMovies = await trendingsService.getTrendings('movie', 'week')
  const trendingDayTV = await trendingsService.getTrendings('tv', 'day')
  const trendingWeekTV = await trendingsService.getTrendings('tv', 'week')

  const topRatedMovies = await movieServices.getMovies('top_rated')
  const popularMovies = await movieServices.getMovies('popular')
  const nowPlayingMovies = await movieServices.getMovies('now_playing')
  const upcomingMovies = await movieServices.getMovies('upcoming')

  const topRatedTVs = await tvServices.getTvs('top_rated')
  const popularTVs = await tvServices.getTvs('popular')
  const airingTodayTVs = await tvServices.getTvs('airing_today')
  const onTheAirTVs = await tvServices.getTvs('on_the_air')

  return {
    props: {
      data: {
        trendingDayMovies,
        trendingWeekMovies,
        trendingDayTV,
        trendingWeekTV,
        topRatedMovies,
        popularMovies,
        nowPlayingMovies,
        upcomingMovies,
        topRatedTVs,
        popularTVs,
        airingTodayTVs,
        onTheAirTVs,
      },
    },
    revalidate: 60 * 60 * 12,
  }
}

const Home: NextPage<IHomePage> = ({ data }) => {
  return <HomePage data={data} />
}
```
</details>


<br/>

### Toast Message

<details>
    <summary>구현 방법</summary>

<img src='https://user-images.githubusercontent.com/58322754/173058168-435220ce-7433-428f-ac22-3acb9dacc829.png'>

로그인이 되지 않은 상태에서 로그인이 필요한 기능을 사용시에 메세지가 나온다. frmaer motion를 애니메이션 효과를 주웠고, recoil를 이용하여 전역에서 사용할 수 있도록 하였다.

```tsx
<AnimatePresence>
  <motion.div
    ref={ref}
    variants={variants}
    initial='initial'
    animate='animate'
    exit='exit'
    transition={{
      type: 'tween',
    }}
    className={styles.wrapper}
  >
    <button type='button' onClick={handleCloseToastMessage} className={styles.xBtn}>
      <XIcon styleClassname={styles.xIcon} />
    </button>
    <ExclamationIcon styleClassName={styles.exclamationIcon} />
    <div className={styles.container}>
      <span className={styles.mainMessage}>Required login</span>
      <div className={styles.subMessage}>
        <span>go to the login screen?</span>
        <button type='button' onClick={handleOpenLoginForm} className={styles.yesBtn}>
          Yes
        </button>
      </div>
    </div>
  </motion.div>
</AnimatePresence>

```
</details>

<br/>

### Bookmarked

<details>
    <summary>구현 방법</summary>

<img src='https://user-images.githubusercontent.com/58322754/172021827-ab924d64-7ded-44c8-b2ee-405e52a96e4c.png'>

로그인 상태에서 가능한 기능이며 클릭하면 bookmarked로 저장할 수 있습니다.

```ts
import { IBookmarkResponse } from 'types/bookmark.d'
import prisma from '@libs/client'
import { withApiSession } from '@libs/withSession'
import withHandler from '@libs/withHandler'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse<IBookmarkResponse>) {
  try {
    const {
      session: { user },
    } = req
    const currentUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        id: true,
      },
    })
    if (!currentUser) {
      return res.json({
        ok: false,
        error: 'Plz login',
      })
    }
    if (req.method === 'GET') {
      const {
        query: { page },
      } = req
      const bookmarks = await prisma.bookmark.findMany({
        where: {
          userId: currentUser.id,
        },
        skip: 25 * (+page - 1),
        take: 25,
      })
      const totalCount = await prisma.bookmark.count({
        where: {
          userId: currentUser.id,
        },
      })
      return res.json({
        ok: true,
        bookmarks,
        totalCount,
        totalPage: Math.ceil(totalCount / 25),
        page: +page,
      })
    }
    if (req.method === 'POST') {
      const {
        body: { mediaType, mediaId, posterPath, title, releaseDate, vote },
      } = req
      const existBookmark = await prisma.bookmark.findUnique({
        where: {
          userId_mediaId: {
            userId: currentUser.id,
            mediaId,
          },
        },
        select: {
          id: true,
        },
      })
      if (existBookmark) {
        return res.json({
          ok: false,
          error: 'already bookmark',
        })
      }
      await prisma.bookmark.create({
        data: {
          mediaType,
          mediaId: +mediaId,
          posterPath,
          title,
          releaseDate,
          vote: +vote,
          userId: currentUser.id,
        },
      })
      return res.json({
        ok: true,
      })
    }
    if (req.method === 'DELETE') {
      const {
        body: { mediaId },
      } = req
      const bookmark = await prisma.bookmark.findUnique({
        where: {
          userId_mediaId: {
            userId: currentUser.id,
            mediaId: +mediaId,
          },
        },
        select: {
          id: true,
          userId: true,
        },
      })
      if (!bookmark) {
        return res.json({
          ok: false,
          error: 'this bookmark does not exist',
        })
      }
      if (bookmark.userId !== currentUser.id) {
        return res.json({
          ok: false,
          error: 'No Authorization',
        })
      }
      await prisma.bookmark.delete({
        where: {
          id: bookmark.id,
        },
      })
      return res.json({
        ok: true,
      })
    }
    return res.json({
      ok: false,
      error: 'error',
    })
  } catch (error) {
    return res.json({
      ok: false,
      error: error as string,
    })
  }
}

export default withApiSession(withHandler({ methods: ['POST', 'GET', 'DELETE'], handler, isPrivate: true }))

```
</details>

<br/>

### Comment 

<details>
    <summary>구현 방법</summary>

<img src='https://user-images.githubusercontent.com/58322754/172021925-62dc1a02-cb8b-42c5-a5ba-4aedfcc01ad8.png'>
<img src='https://user-images.githubusercontent.com/58322754/172022147-e13947b6-9d73-4db3-b0c2-4f811d38c4dd.png'>

로그인 상태에서 가능한 기능이며 평점과 comment를 남길 수 있습니다.

```ts
import { IPostResponse } from 'types/post'
import prisma from '@libs/client'
import { withApiSession } from '@libs/withSession'
import withHandler from '@libs/withHandler'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse<IPostResponse>) {
  try {
    const {
      session: { user },
    } = req
    const currentUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        id: true,
      },
    })
    if (!currentUser) {
      return res.json({
        ok: false,
        error: 'Plz login',
      })
    }
    if (req.method === 'GET') {
      const posts = await prisma.post.findMany({
        include: {
          user: {
            select: {
              avatar: true,
              username: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      return res.json({
        ok: true,
        posts,
      })
    }
    if (req.method === 'POST') {
      const {
        body: { text, mediaType, mediaId, posterPath, mediaTitle, vote },
      } = req
      await prisma.post.create({
        data: {
          text,
          mediaType,
          mediaId: +mediaId,
          posterPath,
          mediaTitle,
          vote: +vote,
          userId: currentUser.id,
        },
      })
      return res.json({
        ok: true,
      })
    }
    if (req.method === 'DELETE') {
      const {
        body: { postId },
      } = req
      const post = await prisma.post.findUnique({
        where: {
          id: +postId,
        },
        select: {
          id: true,
          userId: true,
        },
      })
      if (!post) {
        return res.json({
          ok: false,
          error: 'this post does not exist',
        })
      }
      if (post.userId !== currentUser.id) {
        return res.json({
          ok: false,
          error: 'No Authorization',
        })
      }
      await prisma.post.delete({
        where: {
          id: post.id,
        },
      })
      return res.json({
        ok: true,
      })
    }
    return res.json({
      ok: false,
      error: 'error',
    })
  } catch (error) {
    return res.json({
      ok: false,
      error: error as string,
    })
  }
}

export default withApiSession(withHandler({ methods: ['POST', 'GET', 'DELETE'], handler, isPrivate: true }))
```
</details>

<br/>





### Discovery

<details>
    <summary>구현 방법</summary>

<img src='https://user-images.githubusercontent.com/58322754/172022207-ed5bfea3-a7ef-4831-b9cf-27e0c23a76fc.png'>

Media Type별 카테고리 별 장르별 로 영화를 더 볼 수 있으며 react query useInfiniteQuery를 사용하여 마지막 page까지 볼 수 있다. 그리고 framer motion 기능을 이용하여 애니메이션 효과를 주었다.

```ts
export const useInfiniteMovies = (category: MovieCategory) => {
  return useInfiniteQuery<IMovieResult, Error>(
    ['movies', category],
    ({ pageParam = 1 }) => services.getPageMovies({ category, pageParam }),
    {
      getNextPageParam: (lastPage: IMovieResult) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1
        return undefined
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    }
  )
}
```
</details>

<br/>

### Login And Create Account

<details>
    <summary>구현 방법</summary>

<img src='https://user-images.githubusercontent.com/58322754/172022961-7f4f955a-4790-4fb9-bb3f-ad86ed3dab86.png'>

iron session과 nextjs apis를 이용하여 로그인 기능을 만들었습니다.

```ts
import { withIronSessionApiRoute } from 'iron-session/next'

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number
    }
  }
}

const cookieOptions = {
  cookieName: 'wantedMovieSession',
  password: process.env.COOKIE_PASSWORD!,
}

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions)
}
```

```ts
import prisma from '@libs/client'
import { withApiSession } from '@libs/withSession'

import * as bcrypt from 'bcrypt'

import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { IResponse } from '@libs/withHandler'

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  try {
    const {
      body: { email, password },
    } = req
    const existEmail = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    })
    if (!existEmail) {
      return res.json({
        ok: false,
        error: 'This email does not exist',
      })
    }
    const isPasswordCheck = await bcrypt.compare(password, existEmail.password)
    if (!isPasswordCheck) {
      return {
        ok: false,
        error: 'Password not matched',
      }
    }
    req.session.user = {
      id: existEmail.id,
    }
    await req.session.save()
    return res.json({
      ok: true,
    })
  } catch (error) {
    return res.json({
      ok: false,
      error: error as string,
    })
  }
}

export default withApiSession(withHandler({ methods: ['POST'], handler, isPrivate: false }))
```
</details>

<br/>

### Community

<details>
    <summary>구현 방법</summary>

<img src='https://user-images.githubusercontent.com/58322754/173058860-9619a40b-a5df-4844-ae73-098bc64bbab0.png'>

<img src='https://user-images.githubusercontent.com/58322754/173059376-c6bc4307-a84a-4f63-a92b-fd65d7a14e08.png'>

유저들이 평가를 내린 comment들을 모아놓은 부분으로 댓글 및 좋아요 기능도 있다.

```ts
import { ICommentResponse } from 'types/comment'
import { dbNow } from '@utils/dbNow'
import prisma from '@libs/client'
import { withApiSession } from '@libs/withSession'
import withHandler from '@libs/withHandler'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse<ICommentResponse>) {
  try {
    const {
      session: { user },
      query: { postId },
    } = req
    const currentUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        id: true,
      },
    })
    if (!currentUser) {
      return res.json({
        ok: false,
        error: 'Plz login',
      })
    }
    if (!postId) {
      return res.json({
        ok: false,
        error: 'post id is undefined.',
      })
    }
    const post = await prisma.post.findUnique({
      where: {
        id: +postId,
      },
      select: {
        id: true,
      },
    })
    if (!post) {
      return res.json({ ok: false, error: 'post does not exist.' })
    }
    if (req.method === 'GET') {
      const {
        query: { page },
      } = req
      const comments = await prisma.comment.findMany({
        where: {
          postId: +postId,
        },
        skip: 25 * (+page - 1),
        take: 25,
        include: {
          user: {
            select: {
              id: true,
              avatar: true,
              username: true,
            },
          },
        },
      })

      const totalCount = await prisma.comment.count({
        where: {
          postId: +postId,
        },
      })
      return res.json({
        ok: true,
        comments,
        totalCount,
        totalPage: Math.ceil(totalCount / 25),
      })
    }
    if (req.method === 'POST') {
      const {
        body: { comment },
      } = req
      await prisma.comment.create({
        data: {
          comment,
          userId: currentUser.id,
          postId: post.id,
          createdAt: dbNow(),
          updatedAt: dbNow(),
        },
      })
      return res.json({
        ok: true,
      })
    }
    if (req.method === 'DELETE') {
      const {
        body: { commentId },
      } = req
      const comment = await prisma.comment.findUnique({
        where: {
          id: +commentId,
        },
        select: {
          id: true,
          userId: true,
        },
      })
      if (!comment) {
        return res.json({
          ok: false,
          error: 'this comment is not exist',
        })
      }
      if (comment.userId !== currentUser.id) {
        return res.json({
          ok: false,
          error: 'No Authorization',
        })
      }
      await prisma.comment.delete({
        where: {
          id: comment.id,
        },
      })
      return res.json({
        ok: true,
      })
    }
    return res.json({
      ok: false,
      error: 'error',
    })
  } catch (error) {
    return res.json({
      ok: false,
      error: error as string,
    })
  }
}

export default withApiSession(withHandler({ methods: ['POST', 'GET', 'DELETE'], handler, isPrivate: true }))
s
```

</details>

<br/>

### React Error Boundary

<details>
    <summary>구현 방법</summary>

<img src='https://user-images.githubusercontent.com/58322754/172023088-f2866725-62be-4d6e-a175-a9181ffbc6b1.png'>

error 발생시 다음과 같은 화면이 나와 하위 컴포넌트 트리의 어디에서든 자바스크립트 에러를 기록하며 깨진 컴포넌트 트리 대신 폴백 UI를 보여주는 React 컴포넌트

```tsx
<QueryErrorResetBoundary>
  {({ reset }) => (
    <ErrorBoundary
      onReset={reset}
      // eslint-disable-next-line react/no-unstable-nested-components
      fallbackRender={({ resetErrorBoundary }) => <Error resetErrorBoundary={resetErrorBoundary} />}
    >
      <Component {...pageProps} />
    </ErrorBoundary>
  )}
</QueryErrorResetBoundary>
```
</details>

<br/>

