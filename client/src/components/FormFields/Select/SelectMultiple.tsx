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
  formatOptions,
} from './Select'

export const MIN_LENGTH_FOR_MULTIPLE_CLEARABLE = 3

interface ISelectMultipleProps extends Omit<ISelectProps, 'initialValue'> {
  initialValue?: (TOption | string)[] | null
  maxLimit?: number
}

const multipleCustomStyles: Partial<Styles<TOption, true>> = {
  ...(customStyles as Partial<Styles<TOption, true>>),
  multiValue: (provided) => ({
    ...provided,
    ..._tw`bg-gray-200 rounded-md font-medium`,
  }),
  // multiValueLabel: (provided) => ({
  //   ...provided,
  //   ..._tw`bg-blue-500`,
  // }),
  multiValueRemove: (provided) => ({
    ...provided,
    ..._tw`bg-gray-200 text-gray-500 rounded-r-md`,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    ..._tw`px-0 py-1`,
    ...(state.hasValue && _tw`py-0`),
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
  const formattedInitialValues =
    initialValue?.map((opt) =>
      typeof opt === 'string' ? opt : opt.id || opt.value
    ) ?? []

  const formattedOptions: TOption[] | undefined | null = useMemo(
    () => formatOptions(options),
    [options]
  )

  const initialValueWithInfo = useMemo(
    () =>
      formattedOptions?.filter((opt) =>
        opt.id
          ? formattedInitialValues.includes(opt.id)
          : formattedInitialValues.includes(opt.value)
      ),
    []
  )

  const [selectedOptions, setSelectedOptions] = useState<ValueType<
    TOption,
    true
  > | null>(initialValueWithInfo)

  const handleChange = (newOptions: ValueType<TOption, true>) => {
    if (maxLimit && newOptions && newOptions?.length > maxLimit) {
      // TODO: add error here when the user tries to update beyond maxLimit
      return
    }

    setSelectedOptions(newOptions)
  }

  useEffect(() => {
    register({ name, type: 'custom' }, { ...validations })
    return () => unregister(name)
  }, [name, register, unregister])

  useEffect(() => {
    const newOptions = selectedOptions?.length
      ? selectedOptions.map((opt) => ({
          id: opt.id || opt.value,
        }))
      : null

    // if (selectedOptions) {
    //   newOptions = selectedOptions.map((opt) => ({
    //     id: opt.id || opt.value,
    //   }))
    // }

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
            options={formattedOptions || undefined}
            getOptionValue={(option: TOption) =>
              `${option['id'] ?? option['value']}`
            }
            getOptionLabel={(option: TOption) => `${option['name']}`}
            isClearable={
              Array.isArray(selectedOptions) &&
              selectedOptions.length >= MIN_LENGTH_FOR_MULTIPLE_CLEARABLE
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
