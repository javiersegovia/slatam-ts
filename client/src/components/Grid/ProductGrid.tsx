import React from 'react'
import _tw from 'twin.macro'
import { ProductCard } from '@components/Card/Product'
import faker from 'faker'
import { Product, ProductStatus } from '@graphql/schema'
import { NestedPartial } from '@lib/utils/types'

const products: NestedPartial<Product[]> = new Array(30)
  .fill(null)
  .map((_e, idx) => ({
    id: idx,
    name: faker.commerce.productName(),
    status: idx % 2 ? ProductStatus.Active : ProductStatus.Inactive,
    price: faker.random.number(10000),
    description: faker.commerce.productDescription(),
  }))

console.log(products)

const ProductGrid = () => {
  return (
    <div tw="mx-auto max-w-screen-xl px-6 py-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} key={product?.id} />
      ))}
    </div>
  )
}

export default ProductGrid
