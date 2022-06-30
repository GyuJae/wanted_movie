import dynamic from 'next/dynamic'
import { heightVariants } from '@animations/variants'
import { useClickAway } from 'react-use'

import { AnimatePresence, motion } from 'framer-motion'
import { MouseEvent, useRef, useState } from 'react'

const StarIcon = dynamic(() => import('@components/Icons/StarIcon'), { ssr: false })

interface IProps {
  handleVoteValue: (voteValue: number) => void
  voteValue: number
}

const styles = {
  wrapper: 'z-40 w-14 h-8 rounded-full border-[1px] border-zinc-800',
  openBtn: 'flex justify-center items-center space-x-1 w-full h-full',
  starIcon: 'w-4 fill-red-700',
  voteValue: 'text-sm text-zinc-400',
  btnContainer: 'overflow-y-scroll mt-2 w-20 h-24 bg-zinc-900 rounded-md scrollBar',
  btnItem: 'flex justify-center items-center space-x-2 w-full h-6 hover:bg-zinc-800',
}

const Vote = ({ voteValue, handleVoteValue }: IProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const handleClickVote = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const {
      currentTarget: { value },
    } = e
    handleVoteValue(+value)
    handleClose()
  }

  useClickAway(ref, handleClose)

  return (
    <div ref={ref} className={styles.wrapper}>
      <button type='button' className={styles.openBtn} onClick={handleOpen}>
        <StarIcon styleClassName={styles.starIcon} />
        <span className={styles.voteValue}>{voteValue.toFixed(1)}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            variants={heightVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{
              type: 'tween',
            }}
            className={styles.btnContainer}
          >
            {Array(11)
              .fill(0)
              .map((value, index) => (
                <button
                  key={`${value}-vote`}
                  type='button'
                  value={(value + index * 0.5).toFixed(1)}
                  onClick={handleClickVote}
                  className='w-full'
                >
                  <li className={styles.btnItem}>
                    <StarIcon styleClassName={styles.starIcon} />
                    <span className={styles.voteValue}>{(value + index * 0.5).toFixed(1)}</span>
                  </li>
                </button>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Vote
