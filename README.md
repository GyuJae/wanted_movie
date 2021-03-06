# ๐ฅ Wanted ๊ฐ์ธ๊ณผ์  - ์ํ ์น ๋ง๋ค๊ธฐ

<img src="https://user-images.githubusercontent.com/58322754/173046920-ff824be2-023c-4cb8-97d7-9a6e66b470ea.png">

- **Github Repository URL** <br/> https://github.com/GyuJae/wanted_movie
- **Renewal Github Repository URL** <br/> https://github.com/GyuJae/movie-app-front

<br/>

# ๐ ํ๋ก์ ํธ ์๊ฐ
- **๊ฐ๋ฐ ๊ธฐ๊ฐ** 22.06.01 - 22.06.05
- **๊ฐ๋ฐ์** ์ ๊ท์ฌ
- **ํ๋ก์ ํธ ๊ฐ์** <br/>
๋ณธ ํ๋ก์ ํธ๋ ์ํฐ๋ ํ๋ฆฌ์จ๋ณด๋ฉ ํ๋ก ํธ์๋ 4์ฐจ ์ฝ์ค ๋ง์ง๋ง ๊ฐ์ธ๊ณผ์ ๋ก ์ํ Api์ NextJS๋ฅผ ํ์ฉํ ์ํ ์น์ฌ์ดํธ ์๋๋ค.

<br/>

# ๐จ ๊ธฐ์  ์คํ

|๋ผ์ด๋ธ๋ฌ๋ฆฌ|๋ด์ฉ|
|:---:|:---:|
| NextJS | ์น ํ๋ ์์ํฌ| 
| react query | data fetching| 
| axios | data fetching| 
| react-use | ๋ค์ํ ๋ฆฌ์กํธ Hooks| 
| classnames | styles  |
| react-error-boundary | error boundary  |
| framer-motion | ์ ๋๋ฉ์ด์  |
| tailwind css | css ๋ผ์ด๋ธ๋ฌ๋ฆฌ  |
| react-hook-form | form ๋ผ์ด๋ธ๋ฌ๋ฆฌ  |
| iron session | session |
| Recoil | ์ํ๊ด๋ฆฌ |
| Prisma | Data ORM |
| PlanetScale | My SQL platform |
| Cloudflare | CDN Service |
| Vercel | Deploy |

<br/>


# ๐ ๊ธฐ๋ฅ ์ค๋ช 


### Carousel

<details>
    <summary>๊ตฌํ ๋ฐฉ๋ฒ</summary>


Framer motion ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ด์ฉํ์ฌ drag๋ฅผ ์ฌ์ฉํด์ ์์์ ์ํ๋ค์ ๋ณผ ์ ์๋๋ก ํ์์ต๋๋ค.
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
    <summary>๊ตฌํ ๋ฐฉ๋ฒ</summary>

React query๋ฅผ ์ด์ฉํ์ฌ data fetch ํ์ผ๋ฉฐ service ํ์ผ๊ณผ hooksํ์ผ๋ก ๋ฐ๋ก ๋๋์ด ๊ฐํธํ ๋ฐ์ดํฐ๋ฅผ ๋ถ๋ฌ ์ฌ์ ์๋๋ก ํ์์ต๋๋ค.

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
    <summary>๊ตฌํ ๋ฐฉ๋ฒ</summary>

NextJs ์น ํ๋ ์ ์ํฌ์ ๊ธฐ๋ฅ๋ก ๋ฐฑ์๋ CRUD Api๋ฅผ๋ง๋ค์์ต๋๋ค. ๋ฐ์ดํฐ๋ PlanetScale์ ์ ์ฅํ์ผ๋ฉฐ data ORM์ผ๋ก prisma๋ฅผ ์ฌ์ฉํ๋ฉฐ ์ฌ์ง์ Cloudflare๋ฅผ ์ด์ฉํ์ฌ ์ฌ๋ ธ์ต๋๋ค. ๊ตฌํํ ๊ธฐ๋ฅ์ผ๋ก๋ ๋ก๊ทธ์ธ๊ธฐ๋ฅ, avatar ์ฌ์ง ์ฌ๋ฆฌ๊ธฐ, bookmark ์ ์ฅํ๊ธฐ, ์ต๊ทผ ๋ณธ ๊ธฐ๋ก ์ ์ฅํ๊ธฐ, ์ํ Comment ๋ฌ๊ธฐ ๋ฑ์ ๊ตฌํํ์ต๋๋ค.

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
  <summary>๊ตฌํ ๋ฐฉ๋ฒ</summary>

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
  <summary>๊ตฌํ ๋ฐฉ๋ฒ</summary>

ISR์ ์ฌ์ฉํ๋ฉด "์ ์ฒด ์ฌ์ดํธ๋ฅผ ๋ค์ buildํ  ํ์ ์์ด" ๊ฐ๊ฐ์ ํ์ด์ง๋ณ๋ก static-generation์ ์ฌ์ฉํ  ์ ์์ต๋๋ค. ISR์ ์ฌ์ฉํ๋ฉด ์๋ฐฑ๋ง ํ์ด์ง๋ก ํ์ฅํ๋ฉด์ static์ ์ด์ ์ ์ ์งํ  ์ ์์ต๋๋ค.


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
    <summary>๊ตฌํ ๋ฐฉ๋ฒ</summary>

<img src='https://user-images.githubusercontent.com/58322754/173058168-435220ce-7433-428f-ac22-3acb9dacc829.png'>

๋ก๊ทธ์ธ์ด ๋์ง ์์ ์ํ์์ ๋ก๊ทธ์ธ์ด ํ์ํ ๊ธฐ๋ฅ์ ์ฌ์ฉ์์ ๋ฉ์ธ์ง๊ฐ ๋์จ๋ค. frmaer motion๋ฅผ ์ ๋๋ฉ์ด์ ํจ๊ณผ๋ฅผ ์ฃผ์ ๊ณ , recoil๋ฅผ ์ด์ฉํ์ฌ ์ ์ญ์์ ์ฌ์ฉํ  ์ ์๋๋ก ํ์๋ค.

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
    <summary>๊ตฌํ ๋ฐฉ๋ฒ</summary>

<img src='https://user-images.githubusercontent.com/58322754/172021827-ab924d64-7ded-44c8-b2ee-405e52a96e4c.png'>

๋ก๊ทธ์ธ ์ํ์์ ๊ฐ๋ฅํ ๊ธฐ๋ฅ์ด๋ฉฐ ํด๋ฆญํ๋ฉด bookmarked๋ก ์ ์ฅํ  ์ ์์ต๋๋ค.

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
    <summary>๊ตฌํ ๋ฐฉ๋ฒ</summary>

<img src='https://user-images.githubusercontent.com/58322754/172021925-62dc1a02-cb8b-42c5-a5ba-4aedfcc01ad8.png'>
<img src='https://user-images.githubusercontent.com/58322754/172022147-e13947b6-9d73-4db3-b0c2-4f811d38c4dd.png'>

๋ก๊ทธ์ธ ์ํ์์ ๊ฐ๋ฅํ ๊ธฐ๋ฅ์ด๋ฉฐ ํ์ ๊ณผ comment๋ฅผ ๋จ๊ธธ ์ ์์ต๋๋ค.

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
    <summary>๊ตฌํ ๋ฐฉ๋ฒ</summary>

<img src='https://user-images.githubusercontent.com/58322754/172022207-ed5bfea3-a7ef-4831-b9cf-27e0c23a76fc.png'>

Media Type๋ณ ์นดํ๊ณ ๋ฆฌ ๋ณ ์ฅ๋ฅด๋ณ ๋ก ์ํ๋ฅผ ๋ ๋ณผ ์ ์์ผ๋ฉฐ react query useInfiniteQuery๋ฅผ ์ฌ์ฉํ์ฌ ๋ง์ง๋ง page๊น์ง ๋ณผ ์ ์๋ค. ๊ทธ๋ฆฌ๊ณ  framer motion ๊ธฐ๋ฅ์ ์ด์ฉํ์ฌ ์ ๋๋ฉ์ด์ ํจ๊ณผ๋ฅผ ์ฃผ์๋ค.

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
    <summary>๊ตฌํ ๋ฐฉ๋ฒ</summary>

<img src='https://user-images.githubusercontent.com/58322754/172022961-7f4f955a-4790-4fb9-bb3f-ad86ed3dab86.png'>

iron session๊ณผ nextjs apis๋ฅผ ์ด์ฉํ์ฌ ๋ก๊ทธ์ธ ๊ธฐ๋ฅ์ ๋ง๋ค์์ต๋๋ค.

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
    <summary>๊ตฌํ ๋ฐฉ๋ฒ</summary>

<img src='https://user-images.githubusercontent.com/58322754/173058860-9619a40b-a5df-4844-ae73-098bc64bbab0.png'>

<img src='https://user-images.githubusercontent.com/58322754/173059376-c6bc4307-a84a-4f63-a92b-fd65d7a14e08.png'>

์ ์ ๋ค์ด ํ๊ฐ๋ฅผ ๋ด๋ฆฐ comment๋ค์ ๋ชจ์๋์ ๋ถ๋ถ์ผ๋ก ๋๊ธ ๋ฐ ์ข์์ ๊ธฐ๋ฅ๋ ์๋ค.

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
    <summary>๊ตฌํ ๋ฐฉ๋ฒ</summary>

<img src='https://user-images.githubusercontent.com/58322754/172023088-f2866725-62be-4d6e-a175-a9181ffbc6b1.png'>

error ๋ฐ์์ ๋ค์๊ณผ ๊ฐ์ ํ๋ฉด์ด ๋์ ํ์ ์ปดํฌ๋ํธ ํธ๋ฆฌ์ ์ด๋์์๋  ์๋ฐ์คํฌ๋ฆฝํธ ์๋ฌ๋ฅผ ๊ธฐ๋กํ๋ฉฐ ๊นจ์ง ์ปดํฌ๋ํธ ํธ๋ฆฌ ๋์  ํด๋ฐฑ UI๋ฅผ ๋ณด์ฌ์ฃผ๋ React ์ปดํฌ๋ํธ

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

