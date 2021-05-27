import React from 'react'
import _tw from 'twin.macro'
import DashboardSideBar from '@components/Layout/SideBar/DashboardSideBar'
import { IsAuthenticated } from '@components/Auth'
import ProductList from '@root/src/views/dashboard/products/ProductList'
import DashboardContainerProps from '@components/UI/Container'
import Title from '@components/UI/Title'
import Button from '@components/Button'
import Link from 'next/link'
import routes from '@lib/utils/routes'
import { HiPlus } from 'react-icons/hi'
import { useMyProductsQuery } from '@graphql/hooks'

const DashboardProducts = () => {
  const { data: products, isLoading } = useMyProductsQuery()

  if (isLoading) {
    return null
  }

  return (
    <IsAuthenticated>
      <DashboardSideBar>
        <DashboardContainerProps>
          {/* <Title tw="mt-5">My products</Title> */}
          {!isLoading && products?.myProducts?.length ? (
            <>
              <div tw="flex justify-between mt-8 items-center">
                <Title>My products</Title>
                <div tw="flex items-center">
                  <Link href={routes.dashboard.products.create} passHref>
                    <a>
                      <Button
                        size="SM"
                        type="button"
                        tw="px-4 flex items-center"
                      >
                        <HiPlus className="mr-2" />
                        New product
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
              <ProductList products={products?.myProducts} />
            </>
          ) : (
            <div tw="text-center">
              <h2 tw="text-2xl font-medium mt-10">
                Your product list is empty
              </h2>
              <p tw="mt-5 italic underline text-blue-900">
                <Link href={routes.dashboard.products.create} passHref>
                  <a>Click here to create your first product</a>
                </Link>
              </p>
            </div>
          )}
        </DashboardContainerProps>
      </DashboardSideBar>
    </IsAuthenticated>
  )
}

export default DashboardProducts
