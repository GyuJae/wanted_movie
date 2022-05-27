import classNames from 'classnames'
import { useRecoilState } from 'recoil'

import { TMediaTypeState, mediaTypeState } from 'atoms/mediaTypeState'

interface IProps {
  itemName: TMediaTypeState
}

const HeaderItem = ({ itemName }: IProps) => {
  const [showState, setShowState] = useRecoilState(mediaTypeState)
  const itemDict: Record<TMediaTypeState, string> = {
    movie: 'Movies',
    tv: 'TV Shows',
    person: 'People',
  }

  const handleClick = () => {
    setShowState(itemName)
  }

  return (
    <button type='button' onClick={handleClick}>
      <li className={classNames({ 'text-white font-semibold': showState === itemName })}>{itemDict[itemName]}</li>
    </button>
  )
}

export default HeaderItem
