import React from 'react'
import _tw from 'twin.macro'
// import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Input } from '@components/FormFields'
import Button from '@components/Button'
import Select, { TOption, SelectMultiple } from '@components/FormFields/Select'
import faker from 'faker'

// this should be queried from the database
const peopleOptions = new Array(49).fill(null).map(() => ({
  value: faker.name.firstName(),
  label: faker.name.firstName(),
}))

const citiesOptions = new Array(49).fill(null).map(() => ({
  value: faker.address.zipCode(),
  label: faker.address.city(),
}))

export enum ProductCategory {
  AGRICULTURE,
  TECHNOLOGY,
}

interface IFormValues {
  name: string
  description: string
  price?: number | null
  cities?: TOption[] | null
  contactPerson?: TOption | null
  // category?: number | null
}

// TODO: create helper text for input component
// TODO: create radio field for Status Options
// TODO: add drag and drop image field

const ProductForm = () => {
  const defaultValues: IFormValues = {
    name: '',
    description: '',
    price: null,
    // contactPerson: {
    //   value: peopleOptions[0].value,
    //   label: peopleOptions[0].label,
    // },
    contactPerson: null,
    cities: [
      {
        value: peopleOptions[5].value,
        label: peopleOptions[5].label,
      },
    ],
    // category: null,
  }

  const {
    register,
    unregister,
    handleSubmit,
    formState,
    setValue,
    control,
    errors,
  } = useForm<IFormValues>({
    defaultValues,
  })

  const { submitCount } = formState

  const onSubmit = (data: IFormValues) => {
    // todo: handle this logic
    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} tw="mb-8 space-y-3">
      <Input
        name="name"
        type="text"
        label="Product name"
        placeholder="Choose a name for your product"
        register={register}
        validations={{
          required: {
            value: true,
            message: 'Por favor, ingresa un nombre para el producto',
          },
          minLength: {
            value: 8,
            message: 'El nombre del producto debe tener mínimo 8 caracteres',
          },
          maxLength: {
            value: 30,
            message:
              'El nombre del producto no puede exceder los 30 caracteres',
          },
        }}
        error={errors?.name}
      />
      <Input
        name="description"
        type="text"
        label="Description"
        placeholder="Description of the product. Mininum 20 characters."
        isTextArea
        register={register}
        validations={{
          minLength: {
            value: 20,
            message:
              'La descripción del producto debe tener mínimo 20 caracteres',
          },
        }}
        error={errors?.description}
      />
      <Input
        name="price"
        type="number"
        label="Product price"
        placeholder="Put your price here"
        register={register}
        validations={{
          required: {
            value: true,
            message: 'Por favor, ingresa un precio para el producto',
          },
        }}
        error={errors?.price}
      />
      <div className="mt-8"></div>
      <Select
        name="contactPerson"
        label="Choose a contact person"
        options={peopleOptions}
        control={control}
        placeholder="Example select of unique value"
        register={register}
        unregister={unregister}
        setFormValue={setValue}
        initialValue={defaultValues.contactPerson}
        error={errors.contactPerson}
        validations={{
          required: {
            value: true,
            message: 'Por favor, escoge un status',
          },
        }}
      />
      <SelectMultiple
        name="cities"
        label="Choose multiple cities to ship"
        options={citiesOptions}
        control={control}
        placeholder="Example select of multiple values"
        register={register}
        unregister={unregister}
        setFormValue={setValue}
        initialValue={defaultValues.cities}
        error={errors.cities}
        isSubmitClicked={Boolean(submitCount)}
        maxLimit={3}
        validations={{
          required: {
            value: true,
            message: 'Por favor, escoge una ciudad',
          },
        }}
      />

      <Button type="submit">Guardar</Button>

      <div className="pb-96"></div>
    </form>
  )
}

export default ProductForm
