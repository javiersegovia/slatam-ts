import React, { useCallback, useEffect, useMemo, useState } from 'react'
import _tw from 'twin.macro'
import {
  Controller,
  Control,
  FieldName,
  FieldValues,
  FieldErrors,
  FieldError,
  RegisterOptions,
} from 'react-hook-form'
import { Listbox, Transition } from '@headlessui/react'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { getBaseStyles } from './Input'
import Label from './Label'
import { RefReturn } from './shared'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

interface ISelectOption {
  id?: number | string
  description: string
}

type TCustomSelectProps = InputProps &
  SelectProps & {
    name: string
    label: string
    control: Control
    error?: FieldErrors | FieldError | undefined
    validations?: RegisterOptions
    // props: RegisterOptions & { name: FieldName<FieldValues>; type: string }
    register: (args1: any, args2: any) => RefReturn
    // unregister: (args: any) => void
    unregister(name: FieldName<FieldValues> | FieldName<FieldValues>[]): void
    getFormValues: (name: FieldName<FieldValues>) => ISelectOption | null
    setFormValue: (name: FieldName<FieldValues>, value: unknown) => void
    hasFilter?: boolean
    isMultiple?: boolean
    options: ISelectOption[]
    initialValue: ISelectOption
  }

// TODO: work with SIMPLE SELECT -> SINGULAR VALUE
// TODO: work with SIMPLE SELECT -> MULTIPLE VALUES

// TODO: work with FILTER SELECT -> SINGULAR VALUES
// TODO: work with FILTER SELECT -> MULTIPLE VALUES

function Select({
  name,
  error,
  label,
  // control,
  placeholder,
  options = [],
  register,
  unregister,
  validations = {},
  hasFilter = false,
  isMultiple = false,
  initialValue,
  setFormValue,
}: TCustomSelectProps): React.ReactElement {
  const [selectedValues, setSelectedValues] = useState<ISelectOption | null>(
    initialValue
  )

  // TODO: LISTBOX INITIAL VALUE IS NOT WORKING RIGHT

  console.log({ selectedValues })

  useEffect(() => {
    register({ name, type: 'custom' }, { ...validations })
    console.log('triggerin useEffect again!')
    return () => unregister(name)
  }, [name, register, unregister])

  useEffect(() => {
    console.log('triggering useEffect to update FormValue with...')
    console.log(selectedValues)
    setFormValue(name, selectedValues)
  }, [name, selectedValues, setFormValue])

  return (
    // <Controller
    //   control={control}
    //   name={id}
    //   render={({ onChange, onBlur, value, name, ref }) => (
    // { invalid, isTouched, isDirty }
    <Listbox value={selectedValues} onChange={setSelectedValues}>
      {({ open }) => (
        <label htmlFor={name} tw="block">
          {label && <Label>{label}</Label>}
          <div className="relative">
            {hasFilter ? (
              <input id={name} type="text" className={getBaseStyles(!!error)} />
            ) : (
              <>
                {/* <input
                  type="hidden"
                  name={id}
                  value={selectedValues}
                  ref={register({ ...validations })}
                /> */}
                <Listbox.Button as={React.Fragment}>
                  <button
                    id={name}
                    type="button"
                    className={getBaseStyles(!!error)}
                    tw="text-left flex items-center"
                  >
                    {selectedValues?.description || (
                      <span tw="text-gray-500">{placeholder}</span>
                    )}
                    <HiOutlineChevronDown
                      className={`flex-shrink-0 w-4 h-4 transition transform ml-auto ${
                        open && 'rotate-180'
                      }`}
                    />
                  </button>
                </Listbox.Button>
              </>
            )}

            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options
                static
                className="absolute right-0 w-full mt-1 py-4 z-50 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none overflow-hidden border-b-0"
              >
                {options.length ? (
                  options.map((option) => (
                    <Listbox.Option
                      key={option.id || option.description}
                      /**
                       * @ts-expect-error the error of value is described on this issue https://github.com/tailwindlabs/headlessui/issues/187 */
                      value={option}
                      className="hover:bg-gray-100"
                    >
                      {({ selected, active }) => (
                        <div
                          className={`${
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700'
                          } relative select-none hover:bg-gray-100 text-gray-900 flex justify-between w-full pl-8 pr-4 py-2 text-sm leading-5 h-full text-left`}
                        >
                          <span
                            className={`${
                              selected ? 'font-semibold' : 'font-normal'
                            } block truncate`}
                          >
                            {option?.description}
                          </span>
                          {selected && (
                            <span tw="absolute inset-y-0 left-0 flex items-center pl-2">
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))
                ) : (
                  <i className="text-gray-500">No options available</i>
                )}
              </Listbox.Options>
            </Transition>
          </div>

          <span tw="text-red-600 ml-3 text-xs">{error?.message}</span>
        </label>
      )}
    </Listbox>
    //   )}
    // />
  )
}

export default Select
