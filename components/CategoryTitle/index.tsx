interface IProps {
  cateogoryName: string
}

const styles = {
  wrapper: 'flex items-center',
  container: 'text-xl font-semibold',
}

const CategoryTitle = ({ cateogoryName }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.container}>{cateogoryName}</h3>
    </div>
  )
}

export default CategoryTitle
