interface IFileToUrl {
  path: string
  variant: 'avatar' | 'public'
}

export const fileToUrl = ({ path, variant }: IFileToUrl): string =>
  `https://imagedelivery.net/ZYLViq3IecpAakTgPse5sg/${path}/${variant}`
