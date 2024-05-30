import { atomWithStorage } from 'jotai/utils'
import { User } from '@/types'

const userAtom = atomWithStorage<User | null>('user', null)

export default userAtom
