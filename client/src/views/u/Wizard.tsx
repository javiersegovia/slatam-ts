import { useRouter } from 'next/router'
import React from 'react'
import _tw from 'twin.macro'
import routes from '@lib/utils/routes'
import { HiCheck } from 'react-icons/hi'

interface IStepItem {
  title: string
  isActive?: boolean
  isDisabled?: boolean
  isDone?: boolean
  step: number
}

const StepItem = ({ title, isActive, isDisabled, isDone, step }: IStepItem) => {
  return (
    <nav className="lg:text-center flex px-10 items-center lg:block z-10">
      <div
        tw="w-10 h-10 rounded-full text-white inline-flex items-center justify-center"
        css={[
          isActive && _tw`text-white shadow-lg bg-blue-800 transform scale-125`,
          isDisabled && _tw`bg-gray-200 text-gray-600`,
          isDone && _tw`bg-green-500 text-white`,
        ]}
      >
        {!isDone ? step : <HiCheck tw="text-xl" />}
      </div>
      <div tw="lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto">
        {title}
      </div>
    </nav>
  )
}

const Wizard = ({ children }: { title: string; children: React.ReactNode }) => {
  const router = useRouter()
  const { pathname } = router

  const steps: Omit<IStepItem, 'step'>[] = [
    {
      title: 'Complete your profile',
      isActive: pathname === routes.user.setup.profile,
      isDone: pathname !== routes.user.setup.profile,
    },
    {
      title: 'Create your company',
      isActive: pathname === routes.user.setup.company,
      isDisabled: pathname === routes.user.setup.profile,
      isDone: pathname === routes.user.setup.verification,
    },
    {
      title: 'Verify your information',
      isActive: pathname === routes.user.setup.verification,
      isDisabled: pathname !== routes.user.setup.verification,
    },
  ]

  return (
    <>
      <section tw="bg-blue-800 min-h-screen">
        <div tw="container px-0 py-20 mx-auto sm:px-4">
          <div tw="w-full px-4 pt-10 pb-10 mx-auto mt-8 mb-6 bg-gray-100 rounded-none shadow-2xl sm:rounded-lg sm:w-10/12 md:w-6/12 lg:w-7/12 xl:w-10/12 sm:px-6 max-w-screen-xl">
            <div tw="flex flex-col py-10 sm:py-20 mt-5">
              <div tw="relative inline-flex flex-col lg:flex-row justify-center px-5 sm:px-20">
                <div tw="lg:text-center px-10 items-start block md:flex z-10">
                  {steps.map((step, index) => (
                    <StepItem
                      key={step.title}
                      title={step.title}
                      isActive={step.isActive}
                      isDisabled={step.isDisabled}
                      isDone={step.isDone}
                      step={index + 1}
                    />
                  ))}
                </div>
                <div tw="h-1 hidden lg:block w-1/3 bg-gray-200 absolute mt-5" />
              </div>

              <div tw="px-5 sm:px-20 mt-10 pt-10 border-t border-gray-200">
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Wizard
