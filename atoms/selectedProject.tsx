import { atomWithStorage, createJSONStorage } from 'jotai/utils'

const storage = createJSONStorage<number | null>(() => localStorage)
const projectIdAtom = atomWithStorage<number | null>('project', null, storage, {
  getOnInit: true,
})

export default projectIdAtom
