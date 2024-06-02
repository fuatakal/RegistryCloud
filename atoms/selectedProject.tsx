import { atomWithStorage, createJSONStorage } from 'jotai/utils'

const storage = createJSONStorage<number | null>(() => localStorage)
const projectAtom = atomWithStorage<number | null>('projectId', null, storage, {
  getOnInit: true,
})

export default projectAtom
