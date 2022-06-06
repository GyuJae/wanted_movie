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
  }

  const handleClick = () => {
    setShowState(itemName)
  }

  return (
    <li className={classNames({ 'text-white font-semibold': showState === itemName })}>
      <button type='button' onClick={handleClick}>
        {itemDict[itemName]}
      </button>
    </li>
  )
}

export default HeaderItem
