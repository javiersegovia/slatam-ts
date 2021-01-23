/* eslint-disable react-hooks/exhaustive-deps */
// TODO: enable react exhaustive deeps and fix the errors in this file
// https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often

import React, { useEffect, useMemo, useState } from 'react'
import _tw from 'twin.macro'
import ReactSelect, { Styles, ValueType } from 'react-select'
import Label from '@components/FormFields/Label'
import ErrorMessage from '@components/FormFields/ErrorMessage'
import { Controller } from 'react-hook-form'
import {
  MIN_LENGTH_FOR_SEARCH,
  customStyles,
  TOption,
  ISelectProps,
} from './Select'

export const MIN_LENGTH_FOR_MULTIPLE_CLEARABLE = 6

type TPossibleValues = TOption[] | null

interface ISelectMultipleProps extends Omit<ISelectProps, 'initialValue'> {
  initialValue?: TPossibleValues
  maxLimit?: number
}

const multipleCustomStyles: Partial<Styles<TOption, true>> = {
  ...(customStyles as Partial<Styles<TOption, true>>),
  multiValue: (provided) => ({
    ...provided,
    ..._tw`bg-gray-200 rounded-sm font-medium`,
  }),
  // multiValueLabel: (provided) => ({
  //   ...provided,
  //   ..._tw`bg-blue-500`,
  // }),
  multiValueRemove: (provided) => ({
    ...provided,
    ..._tw`bg-gray-200 text-gray-500`,
  }),
}

const SelectMultiple = ({
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
  maxLimit,
  isSubmitClicked = false,
}: ISelectMultipleProps) => {
  const defaultValues = initialValue?.map((opt) => opt.id || opt.value) ?? []
  const initialValueWithInfo = useMemo(
    () =>
      options?.filter((opt) =>
        opt.id
          ? defaultValues.includes(opt.id)
          : defaultValues.includes(opt.value)
      ),
    []
  )

  const [selectedOptions, setSelectedOptions] = useState<ValueType<
    TOption,
    true
  > | null>(initialValueWithInfo)

  // console.log({ initialValue })
  // console.log({ options })

  const handleChange = (newOptions: ValueType<TOption, true>) => {
    if (maxLimit && newOptions && newOptions?.length > maxLimit) {
      // TODO: add error here when the user tries to update beyond maxLimit
      // console.log('will NOT update! limit exceeded')
      return
    }

    setSelectedOptions(newOptions)
  }

  useEffect(() => {
    register({ name, type: 'custom' }, { ...validations })
    return () => unregister(name)
  }, [name, register, unregister])

  useEffect(() => {
    let newOptions = selectedOptions

    if (selectedOptions) {
      newOptions = selectedOptions.map((opt) => ({
        id: opt.id || opt.value,
      }))
    }

    setFormValue(name, newOptions, {
      shouldValidate: isSubmitClicked,
    })
  }, [name, selectedOptions, setFormValue])

  return (
    <Label htmlFor={name} description={label}>
      <Controller
        name={name}
        control={control}
        defaultValue={selectedOptions}
        render={({ name, ref }) => (
          <ReactSelect
            ref={ref}
            onChange={handleChange}
            styles={multipleCustomStyles}
            hasError={Boolean(error)}
            classNamePrefix="Select"
            menuPlacement="auto"
            isMulti
            placeholder={placeholder}
            aria-labelledby={name}
            closeMenuOnSelect={Boolean(
              maxLimit && maxLimit - 1 <= (selectedOptions?.length || 0)
            )}
            value={selectedOptions}
            options={options || undefined}
            getOptionValue={(option: TOption) => `${option['id']}`}
            getOptionLabel={(option: TOption) => `${option['name']}`}
            isClearable={
              Array.isArray(selectedOptions) &&
              selectedOptions.length > MIN_LENGTH_FOR_MULTIPLE_CLEARABLE
            }
            isSearchable={Boolean(
              options && options.length >= MIN_LENGTH_FOR_SEARCH
            )}
          />
        )}
      />
      {Boolean(validations) && <ErrorMessage>{error?.message}</ErrorMessage>}
    </Label>
  )
}

export default SelectMultiple
