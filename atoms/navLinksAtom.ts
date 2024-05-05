import { NavLink } from '@/types'
import { atom } from 'jotai'

const navLinksAtom = atom<NavLink[]>([{ href: '', key: '', name: '' }])

export default navLinksAtom
