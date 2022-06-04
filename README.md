# 🔥 Wanted 개인과제 - 영화 웹 만들기

<img src="https://user-images.githubusercontent.com/58322754/172019640-af4d7f5d-4460-43dc-b6d3-805163c1a1c1.png">

- **Github Repository URL** <br/> https://github.com/GyuJae/wanted_movie
- **배포 URL** <br/> https://wanted-movie-4pfdhsmue-gyujae.vercel.app/

<br/>

# 🗂 프로젝트 소개
- **개발 기간** 22.06.01 - 22.06.05
- **개발자** 정규재
- **프로젝트 개요** <br/>
본 프로젝트는 원티드 프리온보딩 프론트엔드 4차 코스 마지막 개인과제로 영화 Api와 NextJS를 활용한 영화 웹사이트 입니다.

<br/>

# 📁 폴더 구조
<details>
    <summary>펼치기</summary>

</details>

<br/>

# 🔨 기술 스택

|라이브러리|내용|
|:---:|:---:|
| NextJS | 웹 프레임워크| 
| react query | data fetching| 
| axios | data fetching| 
| react-use | 다양한 리액트 Hooks| 
| classnames | styles  |
| framer-motion | 애니메이션  |
| tailwind css | css 라이브러리  |
| react-hook-form | form 라이브러리  |
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
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

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

### Toast Message

<details>
    <summary>구현 방법</summary>

<img src='https://user-images.githubusercontent.com/58322754/172020508-e5ba8e2f-bdd3-48f6-b2bb-5d1cec436540.png'>

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



