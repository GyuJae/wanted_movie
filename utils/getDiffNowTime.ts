import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const getDiffNowTime = (createdAt: Date) => {
  const day = dayjs(createdAt).format('YYYY-MM-DD')
  return dayjs(day).toNow(true)
}
