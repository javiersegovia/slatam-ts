import React from 'react'
import _tw from 'twin.macro'
import { ProductCard } from '@components/Card/Product'
import faker from 'faker'
import { Product, ProductStatus } from '@graphql/schema'
import { NestedPartial } from '@lib/utils/types'
import { useProductsQuery } from '@graphql/hooks'

const products: NestedPartial<Product[]> = new Array(30)
  .fill(null)
  .map((_e, idx) => ({
    id: idx,
    name: faker.commerce.productName(),
    status: idx % 2 ? ProductStatus.Active : ProductStatus.Inactive,
    price: faker.random.number(10000),
    description: faker.commerce.productDescription(),
  }))

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
