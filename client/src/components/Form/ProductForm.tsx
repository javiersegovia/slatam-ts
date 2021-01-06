import React from 'react'
import _tw from 'twin.macro'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Input, Select } from '@components/FormFields'
import Button from '@components/Button'
// import { categoriesOptions } from '@lib/demo/categoriesData'
// import { countriesOptions } from '@lib/demo/countriesData'

// export enum ProductStatus {
//   ACTIVE = 'Active',
//   INACTIVE = 'Inactive',
// }

// this enums should be queried from the database
const statusOptions = [
  {
    description: 'Active',
  },
  {
    description: 'Inactive',
  },
  {
    description: 'Hello',
  },
  {
    description: 'Moto',
  },
]

export enum ProductCategory {
  AGRICULTURE,
  TECHNOLOGY,
}

// this should be queried from the database

interface IFormValues {
  name: string
  description: string
  status: {
    description: string
  }
  price?: number | null
  // category?: number | null
}

// TODO: create helper text for input component
// TODO: create radio field for Status Options
// TODO: create simple multi select for categories
// TODO: create simple multi select (with filter) for countries
// TODO: add drag and drop image field

const ProductForm = () => {
  const defaultValues: IFormValues = {
    name: '',
    description: '',
    status: {
      description: 'Hello',
    },
    price: null,
    // category: null,
  }

  const {
    register,
    unregister,
    handleSubmit,
    getValues,
    setValue,
    watch,
    control,
    errors,
  } = useForm<IFormValues>({
    defaultValues,
  })
  const router = useRouter()
  const onSubmit = (data: IFormValues) => {
    console.log(data)

    // router.push('/dashboard/products')
  }

  // const statusValue = getValues('status')

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
        placeholder="Description of the product. Mininum 40 characters."
        isTextArea
        register={register}
        validations={{
          minLength: {
            value: 40,
            message:
              'La descripción del producto debe tener mínimo 40 caracteres',
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
      <Select
        control={control}
        name="status"
        label="Product status"
        placeholder="Choose the status of your product"
        initialValue={defaultValues.status}
        options={statusOptions}
        register={register}
        unregister={unregister}
        getFormValues={getValues}
        setFormValue={setValue}
      />

      <Button type="submit">Guardar</Button>
    </form>
  )
}

export default ProductForm
