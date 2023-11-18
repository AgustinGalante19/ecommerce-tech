import ContentLoader from "react-content-loader"

const LoaderItem = () => {
  return (
    <ContentLoader
      speed={2}
      width={1104}
      height={150}
      viewBox='0 0 1104 150'
      backgroundColor='#f3f3f3'
      foregroundColor='#ECEBEB'
    >
      <rect x='161' y='65' rx='3' ry='3' width='52' height='6' />
      <rect x='160' y='100' rx='3' ry='3' width='410' height='6' />
      <rect x='6' y='15' rx='3' ry='3' width='130' height='150' />
      <rect x='160' y='40' rx='3' ry='3' width='178' height='6' />
    </ContentLoader>
  )
}

export default LoaderItem
