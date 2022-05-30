interface IProps {
  path: string
  format?: 'w300' | 'w500' | 'w780' | 'w1280' | 'original'
}

export const getImage = ({ path, format = 'original' }: IProps) => `https://image.tmdb.org/t/p/${format}${path}`
