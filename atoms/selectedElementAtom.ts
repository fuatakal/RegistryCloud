import { FormElementInstance } from '@/types/form-elements'
import { atom } from 'jotai'

const selectedElementAtom = atom<FormElementInstance | null>(null)

export default selectedElementAtom
