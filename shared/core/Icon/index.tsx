import { Icons } from './resolver'

export type IconsType = keyof typeof Icons

interface IIcon {
  name: IconsType
  color?: string
  bgColor?: string
  variant: 'primary' | 'secondary'
  size: number
  onClick: () => any
  raw: boolean
  noHighlights: boolean
  disabled: boolean
  rounded: boolean
}

function Icon({
  name,
  size,
  onClick,
  raw,
  color,
  disabled,
  bgColor,
  rounded
}: IIcon) {
  const IconSVG = Icons[name]

  return (
    raw ? 
      <IconSVG size={size} color={color} />
    : <button
        type='button'
        disabled={disabled}
        onClick={!disabled ? onClick : () => {}}
        style={{
          width: '2.5rem',
          height : '2.5rem',
          background: `${bgColor || 'transparent'}`,
          outline:'none',
          border:'none',
          cursor:'pointer',
          borderRadius: `${rounded ? '20px' : '0px'}`,
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
        }}
    >
        <IconSVG size={size} color={color}/>
    </button>
  )
}

const defaultProps: Partial<IIcon> = {
  size: 25,
  onClick: () => undefined,
  raw: false,
  noHighlights: false,
  variant: 'primary',
  disabled: false,
  rounded: false
}

Icon.defaultProps = defaultProps

export default Icon