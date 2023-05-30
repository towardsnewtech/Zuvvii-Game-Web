import { useFormContext } from 'react-hook-form'
import { StyledTextField } from '../../shared/styled'
import { InputLabel } from '@mui/material'

interface IInput {
  id?: string
  name?: string
  value?: string
  className?: string
  onChange?: (e: any) => any
  placeholder?: string
  hookToForm: boolean
  type: 'text' | 'password',
  label: string
}

function Input({
  id,
  name,
  label,
  value,
  type = 'text',
  placeholder,
  hookToForm,
  onChange,
}: IInput) {
  const formContext = useFormContext()
  const isFullyHooked = name && hookToForm && formContext

  const fieldError =
    isFullyHooked && formContext?.formState?.errors?.[name]

  return (
    <>
      <StyledTextField
        {...(id && { id: id })}
        type={type}
        placeholder={placeholder}
        {...(!hookToForm && {
          value: value,
          onChange: onChange
        })}
        {...(isFullyHooked ? formContext.register(name) : {})}
        name={name}
        helperText={isFullyHooked && fieldError && fieldError?.message && fieldError?.message as string}
        fullWidth
        label={label}
      />
    </>
  )
}

Input.defaultProps = {
  hookToForm: false,
  type: 'text'
}

export default Input
