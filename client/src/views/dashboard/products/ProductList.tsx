import React, { useState } from 'react'
import _tw from 'twin.macro'
import { useMyProductsQuery } from '@graphql/hooks'
import NextImage from 'next/image'
import { ProductStatus, MyProductsQuery } from '@graphql/schema'
import Pill from '@components/Pills/Pill'
import { HiOutlineDuplicate, HiX } from 'react-icons/hi'
import routes from '@lib/utils/routes'
import Link from 'next/link'
import { useDeleteProductMutation } from '../../../graphql/hooks'
import { queries } from '@lib/react-query/keys'
import { useQueryClient } from 'react-query'

// TODO: move to another place
const formatNumber = (number: string | number) => {
  const numberToFormat =
    typeof number === 'string' ? parseInt(number, 10) : number

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(numberToFormat)
}

// TODO: build loader with empty list

interface IProductListItemProps {
  product: MyProductsQuery['myProducts'][number]
  isDeleting: boolean
  handleDelete: (id: number) => void
}

const StyledTableTD: React.FC = ({ children, ...otherProps }) => (
  <td tw="py-3 px-3" {...otherProps}>
    {children}
  </td>
)

const ProductListItem = ({
  product,
  isDeleting,
  handleDelete,
}: IProductListItemProps) => {
  const isActive = product.status === ProductStatus.Active
  const smallImage = product.images?.[0]?.small

  return (
    <tr tw="rounded-full transition duration-75 hover:(bg-blue-50)">
      <td tw="pl-3 py-3 rounded-md">
        <Link
          passHref
          href={`${routes.dashboard.products.index}/${product.id}`}
        >
          <a>
            {smallImage && (
              <NextImage
                src={smallImage?.url}
                width={smallImage.width}
                height={smallImage.height}
                tw="rounded-sm"
              />
            )}
          </a>
        </Link>
      </td>
      <StyledTableTD tw="pl-1">
        <Link
          passHref
          href={`${routes.dashboard.products.index}/${product.id}`}
        >
          <a tw="underline">{product.name}</a>
        </Link>
      </StyledTableTD>

      {/* TODO: format price */}
      <StyledTableTD>{formatNumber(product.price)}</StyledTableTD>

      {/* TODO: add product category */}
      <StyledTableTD>{product.information?.category?.name || ''}</StyledTableTD>

      <StyledTableTD>
        <Pill variant={isActive ? 'SUCCESS' : 'WARNING'}>{product.status}</Pill>
      </StyledTableTD>

      <StyledTableTD>
        <div tw="flex items-center space-x-1 text-gray-500 text-lg">
          {/* <HiOutlineDuplicate className="cursor-pointer" /> */}
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => handleDelete(product.id)}
            css={[isDeleting && _tw`opacity-50`]}
          >
            <HiX className="cursor-pointer text-red-500" />
          </button>
        </div>
      </StyledTableTD>
    </tr>
  )
}

interface ProductListProps {
  products: MyProductsQuery['myProducts']
}

const ProductList = ({ products }: ProductListProps) => {
  const queryClient = useQueryClient()
  const [isDeleting, setIsDeleting] = useState(false)

  const { mutate: deleteProduct } = useDeleteProductMutation()

  const handleDelete = async (id: string | number) => {
    setIsDeleting(true)

    await deleteProduct(
      {
        id: typeof id === 'string' ? parseInt(id, 10) : id,
      },
      {
        onSuccess: async () => {
          // todo: check why is deleting all products

          await queryClient.setQueryData(
            useMyProductsQuery.getKey(),
            (oldData: any) => {
              return oldData.myProducts?.filter(
                (cachedProduct: any) => cachedProduct.id !== id
              )
            }
          )
          await queryClient.refetchQueries(useMyProductsQuery.getKey())
        },
      }
    )
  }
  return (
    <>
      {/* recent orders */}

      {products?.length && (
        <>
          <div tw="bg-white rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8">
            <div tw="overflow-x-auto">
              <div tw="align-middle inline-block min-w-full overflow-hidden">
                <table tw="min-w-full">
                  <thead tw="text-left border-b border-blue-100 uppercase text-sm">
                    <tr>
                      <th></th>
                      <th tw="font-medium py-2 px-1 pr-3">Name</th>
                      <th tw="font-medium py-2 px-3">Price</th>
                      <th tw="font-medium py-2 px-3">Category</th>
                      <th tw="font-medium py-2 px-3">Status</th>
                      {/* <th tw="py-2 px-3">Actions</th> */}
                      <th tw="font-medium py-2 px-3">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody tw="divide-y divide-blue-100 text-gray-700 text-sm whitespace-nowrap">
                    {products.map((product) => (
                      <ProductListItem
                        key={product.id}
                        product={product}
                        handleDelete={handleDelete}
                        isDeleting={isDeleting}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
      {/*/ recent orders */}
    </>
  )
}

export default ProductList
