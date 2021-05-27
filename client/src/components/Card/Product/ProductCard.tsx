import React from 'react'
import _tw from 'twin.macro'
import { Product } from '@graphql/schema'
import faker from 'faker'
import { NestedPartial } from '@lib/utils/types'
import Link from 'next/link'

interface ProductCardProps {
  product: NestedPartial<Product>
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatMoney(cents: number) {
  const dollars = cents / 100
  return formatter.format(dollars)
}

const ProductCard = ({ product }: ProductCardProps) => {
  console.log(product)
  return (
    <>
      <div tw="w-full bg-white shadow-lg flex flex-col rounded-lg overflow-hidden">
        <img
          tw="w-full h-56 object-cover object-center"
          src={product.images?.[0]?.large?.url || faker.random.image()}
          alt="avatar"
        />
        <div tw="flex items-center px-2 py-2 bg-blue-900">
          <h1 tw="mx-3 text-white font-semibold text-xs">
            {product.information?.category?.name}
          </h1>
        </div>
        <div tw="py-4 px-6 flex flex-col h-full">
          <Link href={`/products/${product?.id}`}>
            <a href={`/products/${product?.id}`}>
              <h1 tw="text-xl font-bold text-gray-900">{product?.name}</h1>
            </a>
          </Link>
          <p tw="py-2 text-sm text-gray-700">
            {product?.information?.description}
          </p>
          <div tw="flex items-center justify-between mt-auto pt-5">
            {/* TODO: add location */}
            {/* <div tw="flex items-center text-red-500">
              <svg tw="h-6 w-6 fill-current" viewBox="0 0 512 512">
                <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
              </svg>
              <h1 tw="px-2 text-sm text-gray-700">{faker.address.country()}</h1>
            </div> */}
            <div tw="font-bold text-xl text-blue-800">
              {product?.price && formatMoney(product?.price)}
            </div>
          </div>
          <div className="px-4 pt-3 pb-4 border-t mt-4 border-gray-300">
            <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
              Company
            </div>
            <div className="flex items-center pt-2">
              <div
                className="bg-cover bg-center bg-gray-300 w-10 h-10 rounded-full mr-3"
                // style={{
                //   backgroundImage: `url(${faker.random.image()})`,
                //   backgroundColor:
                // }}
              ></div>
              <div>
                <p className="font-bold text-sm text-gray-900">
                  {product.owner?.name}
                </p>
                <p className="text-sm text-gray-700">
                  {product.owner?.information?.description}{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard
