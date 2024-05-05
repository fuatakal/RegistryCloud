import { FormElementInstance } from '@/types/form-elements'
import { atom } from 'jotai'

const formElementsAtom = atom<FormElementInstance[]>([])

export default formElementsAtom
