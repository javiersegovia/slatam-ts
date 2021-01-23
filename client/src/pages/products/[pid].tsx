import React from 'react'
import MainNavbar from '@components/Layout/Navbars/MainNavbar'
import MainFooter from '@components/Layout/Footers/MainFooter'
import MainProduct from '@views/products/MainProduct'

export default function ProductPage() {
  return (
    <>
      <MainNavbar />
      <MainProduct />
      <MainFooter />
    </>
  )
}
