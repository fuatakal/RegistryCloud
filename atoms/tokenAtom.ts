'use client'

import { atomWithStorage, createJSONStorage } from 'jotai/utils'

const storage = createJSONStorage<string | null>(() => localStorage)
const tokenAtom = atomWithStorage<string | null>('jwtToken', null, storage, {
  getOnInit: true,
})

export default tokenAtom
