import { joiResolver } from '@hookform/resolvers/joi'
import React, { FormEvent, ReactNode, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import tagStyled from 'styled-components'

interface IForm {
  id?: string
  onSubmit: (values: any) => any
  children: ReactNode
  initialValues?: Object
  validationSchema: any,
  gap: string | undefined
}

function Form({
  id,
  onSubmit,
  validationSchema,
  children,
  initialValues,
  gap
}: IForm) {
  const formMethods = useForm({
    resolver: joiResolver(validationSchema),
    defaultValues: initialValues
  })

  const handleFormSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    await formMethods.handleSubmit(onSubmit)(event)
  }

  return (
    <FormProvider {...formMethods}>
      <FormMain
        {...(id && { id: id })}
        onSubmit={handleFormSubmit}
        style={{
          gap: gap ? gap : "0rem"
        }}
      >
        {children}
      </FormMain>
    </FormProvider>
  )
}

Form.defaultProps = {
  onSubmit: () => {},
  children: '',
  initialValues: {},
  gap: '1rem'
}

export default Form

const FormMain = tagStyled.form`
  & .MuiOutlinedInput-root {
    border-radius : 30px;
    padding-left : 15px;
    border: 1px solid white;
  }

  & .MuiInputBase-input {
    border-radius : 30px;
  }

  & .MuiFormHelperText-root {
    color: #bf1650;
    font-weight: 500;
  }

  display: flex;
  flex-direction: column ;
  align-items: center;
  width : 800px;
`
