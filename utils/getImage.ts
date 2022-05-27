interface IProps {
  path: string
  format?: string
}

export const getImage = ({ path, format = 'original' }: IProps) => `https://image.tmdb.org/t/p/${format}${path}`
