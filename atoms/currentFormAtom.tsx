import { Form } from '@/types'
import { atom } from 'jotai'

const currentFormAtom = atom<Form | null>(null)

export default currentFormAtom
