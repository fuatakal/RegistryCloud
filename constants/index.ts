import { Paths, RouteKey } from '@/routes'
import { NavLink } from '@/types'

export const staffLinks: NavLink[] = [
  { href: Paths.HOME, key: RouteKey.HOME, name: 'Home' },
  { href: Paths.MY_FORMS, key: RouteKey.MY_FORMS, name: 'MyForms' },
  { href: Paths.CREATE_FORM, key: RouteKey.CREATE_FORM, name: 'CreateForm' },
]

export const defaultLinks: NavLink[] = [
  { href: Paths.HOME, key: RouteKey.HOME, name: 'Home' },
  { href: Paths.MY_FORMS, key: RouteKey.MY_FORMS, name: 'MyForms' },
]
