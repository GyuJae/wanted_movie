import Image from 'next/image'
import UserIcon from '@components/Icons/UserIcon'
import classNames from 'classnames'
import { fileToUrl } from '@utils/fileToUrl'

interface IProps {
  path?: string | null
  size?: 'small' | 'medium' | 'big'
}

const styles = {
  container: (size: 'small' | 'medium' | 'big') =>
    classNames('relative flex justify-center items-center bg-zinc-700 rounded-full', {
      'w-12 h-12': size === 'medium',
      'w-8 h-8': size === 'small',
      'w-16 h-16': size === 'big',
    }),
  image: 'rounded-full',
}

const Avatar = ({ path, size = 'medium' }: IProps) => {
  if (!path)
    return (
      <div className={styles.container(size)}>
        <UserIcon styleClassname='w-4 fill-zinc-500' />
      </div>
    )
  return (
    <div className={styles.container(size)}>
      <Image
        src={fileToUrl({ path, variant: 'avatar' })}
        layout='fill'
        alt='avatar'
        priority
        className={styles.image}
      />
    </div>
  )
}

export default Avatar
