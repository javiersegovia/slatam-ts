import React from 'react'
import _tw, { styled } from 'twin.macro'
import DashboardContainerProps from '@components/UI/Container'
import Box from '@components/UI/Box'
import Title from '@components/UI/Title'
import Avatar from '@components/Avatar/Avatar'
import { formatMoney } from '../../products/MainProduct'
import { useProductsQuery } from '@graphql/hooks'
import { HiDownload } from 'react-icons/hi'

const StyledProductTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto 1fr;

  & > span {
    ${_tw`border-l border-b border-gray-200 text-sm p-2 text-center`}

    &.name {
      text-align: left;
    }

    &.title {
      ${_tw`font-medium`}
    }

    &.left {
      ${_tw`text-left`}
    }
  }

  ${_tw`border-r border-t border-gray-200 rounded-md overflow-hidden`}
`

const StyledAttachmentsTable = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;

  & > span {
    ${_tw`border-b border-gray-200 text-sm p-2`}

    &.download {
      ${_tw`text-right font-medium text-xl text-blue-700 cursor-pointer`}
    }
  }

  ${_tw`border-r border-l border-t border-gray-200 rounded-md overflow-hidden`}
`

const OrderDetails = () => {
  const { data: products, isLoading } = useProductsQuery()
  const orderProducts = !isLoading ? products?.products : null

  const attachments = [...Array(6).keys()]

  return (
    <DashboardContainerProps tw="mt-5">
      <h2 tw="text-xl mb-6">
        Currently <span tw="font-bold">Selling 6 units </span>
        {/* <br /> */}
        {/* <span tw="text-xl"> */} for <span tw="font-bold">$5.200,00</span>
        {/* </span> */}
      </h2>
      <div tw="grid grid-cols-12 gap-6">
        <div tw="col-span-12 lg:col-span-8 space-y-6">
          <Box>
            <div tw="border-b border-gray-200 py-4 px-6">
              <div tw="flex justify-between">
                <Title tw="text-xl font-medium">Order Information</Title>
                <p tw="font-medium text-gray-500">
                  <span tw="text-gray-400">ID:</span> ckliecj9k00338ui0gao3td4v
                </p>
              </div>
              <p tw="text-gray-500 mt-2 text-sm">
                Main information about the order
              </p>
            </div>

            {/* Buyer and seller information */}
            <div tw="grid items-center grid-cols-2 py-4 px-12 pb-10">
              {/* start of buyer */}
              <div tw="flex flex-col text-sm">
                <span tw="block font-medium text-gray-700">BUYER</span>
                <div tw="flex items-center space-x-2 mt-2">
                  <Avatar size="XS" />
                  <div tw="flex flex-col">
                    <span tw="font-medium">Antonio Rivero</span>
                    <span tw="italic text-gray-500">Broker</span>
                  </div>
                </div>
              </div>
              {/* end of buyer */}
              {/* start of seller */}
              <div tw="flex flex-col text-sm">
                <span tw="block font-medium text-gray-700">SELLER</span>
                <div tw="flex items-center space-x-2 mt-2">
                  <Avatar size="XS" />
                  <div tw="flex flex-col">
                    <span tw="font-medium">Slatam Group</span>
                    <span tw="italic text-gray-500">Company</span>
                  </div>
                </div>
              </div>
              {/* end of seller */}
            </div>
            {/* end of buyer and seller information */}
            {/* start of order information */}
            {/* <div tw="grid items-center grid-cols-2 py-4 px-12 text-gray-700">
              <div tw="flex flex-col text-sm space-y-1">
                <span tw="block font-medium text-gray-900">Issue date</span>
                <div>Feb 23, 2021</div>
              </div>
              <div tw="flex flex-col text-sm space-y-1">
                <span tw="block font-medium text-gray-900">
                  Estimated delivery date
                </span>
                <div>Mar 20, 2021</div>
              </div>
            </div> */}
            <div tw="flex flex-col grid-cols-2 py-4 px-12 pb-10 text-gray-700">
              <div tw="flex flex-col text-sm space-y-1">
                <StyledProductTable>
                  <span className="left title">Product name</span>
                  <span className="title">Unit price</span>
                  <span className="title">Quantity</span>
                  <span className="title">Total</span>
                  {orderProducts &&
                    orderProducts?.map((product) => (
                      <React.Fragment key={product.id}>
                        {/* <div tw="px-4"> */}
                        <span className="left">{product.name}</span>
                        <span>{formatMoney(product.price)}</span>
                        <span>2</span>
                        <span>{formatMoney(product.price)}</span>
                        {/* </div> */}
                      </React.Fragment>
                    ))}
                  <span tw="bg-gray-200"></span>
                  <span tw="bg-gray-200"></span>
                  <span tw="bg-gray-200"></span>
                  <span tw="font-bold">{formatMoney(520000)}</span>
                </StyledProductTable>
              </div>
            </div>

            {/* Start of order details info */}
            <div tw="grid grid-cols-2 py-4 px-12 pb-10 gap-y-5 text-gray-800">
              <div tw="flex flex-col text-sm space-y-1">
                <span tw="block font-medium text-gray-700">
                  Order issued on
                </span>
                <div>Feb 23, 2021</div>
              </div>
              <div tw="flex flex-col text-sm space-y-1">
                <span tw="block font-medium text-gray-700">Total price</span>
                <div>{formatMoney(520000)}</div>
              </div>
              <div tw="flex flex-col text-sm space-y-1">
                <span tw="block font-medium text-gray-700">
                  Estimated delivery on
                </span>
                <div tw="text-green-600 italic">Mar 20, 2021</div>
              </div>
              <div tw="flex flex-col text-sm space-y-1">
                <span tw="block font-medium text-gray-700">
                  Shipping method
                </span>
                <div tw="text-yellow-600 italic">To be determined</div>
              </div>
            </div>
            {/* end of order details info */}
          </Box>
          {/* start of attachments */}
          <Box>
            <div tw="py-4 px-6">
              <div tw="flex justify-between">
                <Title tw="text-xl font-medium">Attachments</Title>
              </div>
              <p tw="text-gray-500 mt-2 text-sm">
                Attachments shared between the participants
              </p>
            </div>
            <div tw="pt-2 pb-6 px-6">
              <StyledAttachmentsTable>
                {attachments.map((attachment, index) => (
                  <React.Fragment key={index}>
                    <span className="title">
                      This is the name of the attachment
                    </span>
                    <span className="download">
                      <HiDownload />
                    </span>
                  </React.Fragment>
                ))}
              </StyledAttachmentsTable>
            </div>

            {/* end of order details info */}
          </Box>

          {/* end of attachments */}
          {/* start of legal agreement */}
          <Box>
            <div tw="py-4 px-6">
              <div tw="flex justify-between">
                <Title tw="text-xl font-medium">Legal agreement</Title>
              </div>
              <p tw="text-gray-500 mt-2 text-sm">
                Legal agreement between the parties
              </p>
            </div>
            {/* TODO: blur text of legal agreement */}
            <div tw="pt-2 pb-6 px-6 prose text-justify">
              <p>
                1. Incididunt labore veniam est voluptate mollit esse
                consectetur pariatur do fugiat duis esse tempor ea. Tempor id
                excepteur ut culpa laborum commodo sint labore duis pariatur.
                Eiusmod pariatur sint labore proident esse adipisicing dolor.
                Consectetur reprehenderit irure in aliqua tempor irure ex amet
                occaecat commodo adipisicing aliqua esse id. Reprehenderit
                nostrud dolor exercitation culpa quis magna fugiat. Non mollit
                proident incididunt velit duis consectetur officia labore sunt
                ad ex amet culpa.
              </p>
              <p>
                2. Excepteur ut commodo ad pariatur veniam irure. Consequat
                labore Lorem ad sunt laboris duis enim ipsum ad ipsum culpa amet
                occaecat ad. Est aute aute laboris sint cillum velit magna non.
              </p>

              <p>
                3. Est magna qui tempor cupidatat cupidatat enim sunt aute
                consequat. Deserunt ut tempor aliquip do dolor cupidatat. Ea
                aute exercitation excepteur et qui et excepteur cupidatat aliqua
                cillum velit nisi et magna. Proident nisi culpa veniam non est
                et ullamco adipisicing dolor in. Cillum commodo enim do elit
                cupidatat aute.
              </p>

              <p>
                4. Tempor do cupidatat sunt duis labore enim pariatur tempor.
                Ullamco aliqua incididunt voluptate amet nostrud. Veniam quis
                reprehenderit dolor ad sint eiusmod. Exercitation eiusmod
                nostrud aute eu eu in consectetur mollit culpa labore ad eiusmod
                nulla ex. Ut velit tempor occaecat consectetur pariatur tempor
                anim sunt. Excepteur quis pariatur incididunt tempor enim in qui
                ex culpa ad et sit.
              </p>
            </div>

            {/* end of order details info */}
          </Box>
          {/* end of legal agreement */}
        </div>
        <div tw="col-span-12 lg:col-span-4 flex lg:block space-y-6">
          <Box tw="py-4 px-6">
            <Title tw="text-xl font-medium">Status</Title>
            <p tw="font-medium bg-gray-500 rounded-sm pb-3">APPROACH</p>
            <p tw="font-medium text-gray-500 pb-3">SPA</p>
            <p tw="font-medium text-gray-500 pb-3">NEGOTIATION</p>
            <p tw="mt-1 text-yellow-600 italic">
              Waiting for buyer confirmation...
            </p>
            <p tw="mt-1 text-yellow-600 italic">
              Waiting for seller confirmation...
            </p>
          </Box>
          <Box>
            <Title tw="text-xl font-medium py-4 px-6">Timeline</Title>
          </Box>
        </div>
      </div>
    </DashboardContainerProps>
  )
}

export default OrderDetails
