'use client'

import { atomWithStorage, createJSONStorage } from 'jotai/utils'

const storage = createJSONStorage<string | null>(() => localStorage)
const executiveAtom = atomWithStorage<string | null>(
  'executive',
  null,
  storage,
  {
    getOnInit: true,
  }
)

export default executiveAtom
