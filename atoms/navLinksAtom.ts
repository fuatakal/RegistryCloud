import { NavLink } from '@/types'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'

const storage = createJSONStorage<NavLink[] | null>(() => localStorage)
const navLinksAtom = atomWithStorage<NavLink[] | null>(
  'navbarLinks',
  null,
  storage,
  {
    getOnInit: true,
  }
)

export default navLinksAtom
