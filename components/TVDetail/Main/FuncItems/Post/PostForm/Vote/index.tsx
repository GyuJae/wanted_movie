import dynamic from 'next/dynamic'
import { useClickAway } from 'react-use'

import { MouseEvent, useRef, useState } from 'react'

const StarIcon = dynamic(() => import('@components/Icons/StarIcon'))

interface IProps {
  handleVoteValue: (voteValue: number) => void
  voteValue: number
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
    <div ref={ref} className='z-40 w-14 h-8 rounded-full border-[1px] border-zinc-800'>
      <button type='button' className='flex justify-center items-center space-x-1 w-full h-full' onClick={handleOpen}>
        <StarIcon styleClassName='w-4 fill-red-700' />
        <span className='text-sm text-zinc-400'>{voteValue.toFixed(1)}</span>
      </button>
      {open && (
        <ul className='overflow-y-scroll mt-2 w-20 h-24 bg-zinc-900 rounded-md scrollBar'>
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
                <li className='flex justify-center items-center space-x-2 w-full h-6 hover:bg-zinc-800'>
                  <StarIcon styleClassName='w-4 fill-red-700' />
                  <span className='text-sm text-zinc-400'>{(value + index * 0.5).toFixed(1)}</span>
                </li>
              </button>
            ))}
        </ul>
      )}
    </div>
  )
}

export default Vote
