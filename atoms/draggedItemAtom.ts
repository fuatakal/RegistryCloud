import { Active } from '@dnd-kit/core'
import { atom } from 'jotai'

const draggedItemAtom = atom<Active | null>(null)

export default draggedItemAtom
