import { atom } from 'jotai'

export type AlertVariant = 'success' | 'info' | 'warning' | 'error'

interface AlertState {
  isVisible: boolean
  variant: AlertVariant
  message: string
}

const initialAlertState: AlertState = {
  isVisible: false,
  variant: 'success',
  message: '',
}

export const alertStateAtom = atom<AlertState>(initialAlertState)
