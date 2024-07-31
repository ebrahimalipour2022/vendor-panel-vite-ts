import type { ReactNode } from 'react'

import type { Breakpoint } from '@mui/system'

import MobileDialog from './MobileDialog/MobileDialog'
import DesktopDialog from './DesktopDialog/DesktopDialog'

type Props = {
  title: string
  icon?: ReactNode | string
  open: boolean
  setOpen: (open: boolean) => void
  maxWidth?: Breakpoint
  fullWidth?: boolean
  children: ReactNode
  transition?: 'left' | 'right' | 'up' | 'down'
}

const CDialog = ({ open, setOpen, title, icon, maxWidth = 'sm', fullWidth = true, children }: Props) => {
  return (
    <>
      <DesktopDialog
        title={title}
        icon={icon}
        setOpen={setOpen}
        open={open}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        classes='hidden md:block'
      >
        {children}
      </DesktopDialog>
      <MobileDialog
        title={title}
        icon={icon}
        setOpen={setOpen}
        open={open}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        classes={'block md:hidden'}
      >
        {children}
      </MobileDialog>
    </>
  )
}

export default CDialog
