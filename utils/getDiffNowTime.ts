import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const getDiffNowTime = (createdAt: Date) => {
  const day = createdAt.toString().split('T').join(' ').slice(0, 19)
  return dayjs(day).fromNow(true)
}
