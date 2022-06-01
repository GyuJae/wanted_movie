interface IProps {
  cateogoryName: string
}

const CategoryTitle = ({ cateogoryName }: IProps) => {
  return (
    <div className='flex items-center'>
      <h3 className='text-xl font-semibold'>{cateogoryName}</h3>
    </div>
  )
}

export default CategoryTitle
