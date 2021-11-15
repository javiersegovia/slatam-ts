import React from 'react'
import _tw from 'twin.macro'
import { ProductCard } from '@components/Card/Product'
import { useProductsQuery } from '@graphql/hooks'

const ProductGrid = () => {
  const { data: products, isLoading } = useProductsQuery()

  if (isLoading) return null

  return products?.products?.length ? (
    <div tw="mx-auto max-w-screen-xl px-6 py-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {products?.products?.map((product) => (
        <ProductCard product={product} key={product?.id} />
      ))}
    </div>
  ) : (
    <h2 tw="text-xl text-center font-medium mt-10">
      There are no products yet
    </h2>
  )
}

export default ProductGrid
