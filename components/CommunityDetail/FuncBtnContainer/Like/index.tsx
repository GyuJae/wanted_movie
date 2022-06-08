import { ILikeResponse } from 'types/like'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { toggleLike } from '@services/like.service'
import { useIsLike } from '@hooks/like'
import { useRouter } from 'next/router'

import { motion, useAnimation } from 'framer-motion'
import { useMutation, useQueryClient } from 'react-query'

const ThumbsUpIcon = dynamic(() => import('@components/Icons/ThumbsUpIcon'), { ssr: false })

const styles = {
  item: 'w-full',
  button: 'w-full py-2 flex justify-center items-center space-x-2 rounded-md fill-zinc-400 hover:bg-zinc-900',
  buttonName: 'text-sm text-zinc-400',
  icon: (isLike: boolean) => classNames('w-4', { 'fill-red-700': isLike }),
}

const Like = () => {
  const {
    query: { id },
  } = useRouter()
  const iconAnimation = useAnimation()
  const queryClient = useQueryClient()
  const { data, isLoading } = useIsLike({ postId: +(id as string) })
  const { mutate: toggleLikeMutate, isLoading: toggleIsLikeLoading } = useMutation(
    ['toggleLike', id],
    () => toggleLike({ postId: +(id as string) }),
    {
      onSuccess: ({ ok }: ILikeResponse) => {
        if (ok || data?.ok) {
          queryClient.refetchQueries(['like', id])
        }
      },
    }
  )
  const handleClickLike = () => {
    if (!data || isLoading || toggleIsLikeLoading) return
    toggleLikeMutate()
    if (!data.isLike) {
      iconAnimation.start({
        scale: [1, 1.5, 1],
        fill: '#b91c1c',
        rotate: [0, -30, 0],
        transition: {
          duration: 0.3,
        },
      })
    } else {
      iconAnimation.start({
        scale: 1.0,
        fill: '#3f3f46',
      })
    }
  }

  if (!data) return null
  return (
    <li className={styles.item}>
      <button type='button' className={styles.button} onClick={handleClickLike}>
        <motion.div animate={iconAnimation}>
          <ThumbsUpIcon styleClassname={styles.icon(Boolean(data.isLike))} />
        </motion.div>
        <span className={styles.buttonName}>Like</span>
      </button>
    </li>
  )
}

export default Like
