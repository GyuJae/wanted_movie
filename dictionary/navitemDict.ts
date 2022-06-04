interface IProps {
  categoryPathname: string
  categoryName: string
}

export const navMenuItems: IProps[] = [
  {
    categoryName: 'Home',
    categoryPathname: '/',
  },
  {
    categoryName: 'Discovery',
    categoryPathname: '/discovery',
  },
  {
    categoryName: 'Community',
    categoryPathname: '/community',
  },
  {
    categoryName: 'Search',
    categoryPathname: '/search',
  },
]

export const navLibraryItems: IProps[] = [
  {
    categoryName: 'Recent',
    categoryPathname: '/me/recent',
  },
  {
    categoryName: 'Bookmarked',
    categoryPathname: '/me/bookmarked',
  },
]
