import { NavLink } from '@/types'
import { atomWithStorage } from 'jotai/utils'

const navLinksAtom = atomWithStorage<NavLink[] | null>('navbarLinks', null)

export default navLinksAtom
