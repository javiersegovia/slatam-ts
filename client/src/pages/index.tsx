import React from 'react'
import MainNavbar from '@components/Layout/Navbars/MainNavbar'
import MainFooter from '@components/Layout/Footers/MainFooter'
import ProductGrid from '@components/Grid/ProductGrid'

export default function Home() {
  return (
    <>
      <MainNavbar />
      <br />
      <ProductGrid />
      <MainFooter />
    </>
  )
}
