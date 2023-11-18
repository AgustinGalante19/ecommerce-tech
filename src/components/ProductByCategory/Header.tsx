import ContentLoader from "react-content-loader"

const Header = ({
  isLoading,
  categoryName,
}: {
  isLoading: boolean
  categoryName: string
}) => {
  return (
    <header className='bg-primary p-16'>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={1008}
          height={60}
          viewBox='0 0 1008 60'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='350' y='10' rx='3' ry='3' width='293' height='60' />
        </ContentLoader>
      ) : (
        <h2 className='text-6xl text-white font-medium text-center'>
          {categoryName}
        </h2>
      )}
    </header>
  )
}

export default Header
