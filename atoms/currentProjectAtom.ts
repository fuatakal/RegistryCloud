import { Project } from '@/types'
import { atom } from 'jotai'

const currentProjectAtom = atom<Project | null>(null)

export default currentProjectAtom
