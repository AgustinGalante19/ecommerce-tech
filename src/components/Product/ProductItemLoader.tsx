import LoaderItem from "../ProductByCategory/LoaderItem"

const ProductItemLoader = () => {
  return [1, 2, 3, 4].map((e) => (
    <div className='border-y bg-white p-2' key={e}>
      <LoaderItem />
    </div>
  ))
}

export default ProductItemLoader
