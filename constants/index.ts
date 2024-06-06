import { Paths, RouteKey } from '@/routes'
import { NavLink } from '@/types'

export const staffLinks: NavLink[] = [
  { href: Paths.HOME, key: RouteKey.HOME, name: 'Home' },
]

export const defaultLinks: NavLink[] = [
  { href: Paths.HOME, key: RouteKey.HOME, name: 'Home' },
]
