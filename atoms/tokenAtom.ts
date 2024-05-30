import { atomWithStorage } from 'jotai/utils'

const tokenAtom = atomWithStorage<string | null>('jwtToken', null)

export default tokenAtom
