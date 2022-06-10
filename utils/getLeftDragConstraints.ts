interface IProps {
  count: number
  type?: 'large' | 'medium' | 'small'
}

export const getLeftDragConstraints = ({ count, type = 'medium' }: IProps): number => {
  if (type === 'large') return count * 305
  if (type === 'small') return count * 162
  return count * 257
}
