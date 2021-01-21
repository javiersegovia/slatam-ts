/* eslint-disable react-hooks/exhaustive-deps */
// TODO: enable react exhaustive deeps and fix the errors in this file
// https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often

import React, { useEffect, useState } from 'react'
import _tw from 'twin.macro'
import ReactSelect, { Styles, ValueType } from 'react-select'
import Label from '@components/FormFields/Label'
import ErrorMessage from '@components/FormFields/ErrorMessage'
import { RefReturn } from '@components/FormFields/Input'

import {
  Control,
  Controller,
  FieldName,
  FieldValues,
  FieldErrors,
  FieldError,
  RegisterOptions,
} from 'react-hook-form'

export const MIN_LENGTH_FOR_SEARCH = 40

export const customStyles: Partial<Styles<TOption, false>> = {
  control: (_, state) => ({
    ..._tw`bg-white flex items-center shadow-sm w-full text-sm leading-6 py-3 px-3 border rounded-md border-gray-300`,

    ...(state.hasValue && _tw`py-2`),

    ...(state.selectProps.hasError &&
      _tw`text-red-600 border-red-500 hover:border-red-500`),

    ...(state.isFocused &&
      _tw`outline-none ring-2 border-blue-400 ring-blue-400`),

    ...(state.isFocused &&
      state.selectProps.hasError &&
      _tw`border-red-500 ring-red-500`),
  }),
  option: (provided, state) => ({
    ...provided,
    ..._tw`text-gray-700 relative select-none hover:bg-gray-100 flex justify-between w-full pl-8 pr-4 py-2 text-sm leading-5 h-full text-left`,

    ...(state.isFocused && _tw`bg-gray-100`),

    ...(state.isSelected &&
      _tw`bg-gray-100 text-black font-semibold hover:bg-gray-200`),

    ...(state.isSelected && state.isFocused && _tw`bg-gray-200`),
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    ..._tw`text-gray-500`,
  }),
  input: (provided) => ({
    ...provided,
    ..._tw`border-0 ring-0 outline-none`,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    ..._tw`px-0 m-0`,
    ...(state.selectProps.hasError && _tw`text-red-600`),
  }),
  placeholder: (provided) => ({
    ...provided,
    ..._tw`m-0 text-transparent sm:text-gray-500`,
  }),
  valueContainer: (provided) => ({
    ...provided,
    ..._tw`p-0`,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    ..._tw`pr-0 py-0`,
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    ..._tw`m-0`,
  }),
}

export type TSelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

export type TOption = {
  value: string
  label?: string
}

export type TPossibleValues = TOption | null

export interface ISelectProps extends TSelectProps {
  name: string
  control: Control
  label?: string
  options?: TOption[]
  placeholder?: string
  validations?: RegisterOptions
  error?: FieldErrors | FieldError | undefined
  register: (setup: any, options: RegisterOptions) => RefReturn
  unregister(name: FieldName<FieldValues> | FieldName<FieldValues>[]): void
  initialValue?: TPossibleValues
  setFormValue: (
    name: FieldName<FieldValues>,
    value: unknown,
    config?:
      | Partial<{
          shouldValidate: boolean
          shouldDirty: boolean
        }>
      | undefined
  ) => void
  isSubmitClicked?: boolean
}

// CustomSelect built only for single values
const Select = ({
  label,
  name,
  options,
  error,
  control,
  placeholder,
  validations,
  register,
  unregister,
  initialValue = null,
  setFormValue,
  isSubmitClicked = false,
}: ISelectProps) => {
  const [selectedOption, setSelectedOption] = useState<
    ValueType<TOption, false>
  >(initialValue)

  const handleChange = (selected: TPossibleValues = null) => {
    setSelectedOption(selected)
  }

  useEffect(() => {
    register({ name, type: 'custom' }, { ...validations })
    return () => unregister(name)
  }, [name, register, unregister])

  useEffect(() => {
    setFormValue(name, selectedOption, {
      shouldValidate: isSubmitClicked,
    })
  }, [name, selectedOption, setFormValue])

  return (
    <Label htmlFor={name} description={label}>
      <Controller
        name={name}
        control={control}
        styles={customStyles}
        hasError={Boolean(error)}
        classNamePrefix="Select"
        aria-labelledby={name}
        defaultValue={selectedOption}
        placeholder={placeholder}
        onChange={handleChange}
        options={options}
        isClearable={Boolean(!validations?.required)}
        isSearchable={Boolean(
          options && options.length >= MIN_LENGTH_FOR_SEARCH
        )}
        as={ReactSelect}
      />
      {Boolean(validations) && <ErrorMessage>{error?.message}</ErrorMessage>}
    </Label>
  )
}

export default Select
