'use client'

import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { User } from '@/types'

const storage = createJSONStorage<User | null>(() => localStorage)
const userAtom = atomWithStorage<User | null>('user', null, storage, {
  getOnInit: true,
})

export default userAtom
