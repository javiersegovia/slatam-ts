import React from 'react'
import MainNavbar from '@components/Layout/Navbars/MainNavbar'
import MainFooter from '@components/Layout/Footers/MainFooter'
import MainProduct from '@views/products/MainProduct'
import { useRouter } from 'next/router'
import { useProductQuery } from '@graphql/hooks'

export default function ProductPage() {
  const router = useRouter()
  const { pid } = router.query

  const { data: product, isLoading } = useProductQuery(
    {
      id: (pid && parseInt(pid as string, 10)) || 0,
    },
    {
      enabled: !!pid,
    }
  )

  if (!isLoading && !product) {
    // todo: redirect to 404
  }

  return (
    <>
      <MainNavbar />
      {!isLoading && product && <MainProduct product={product.product} />}
      <MainFooter />
    </>
  )
}
