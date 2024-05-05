export interface NavLink {
  href: string
  name: string
  key: string
}

export interface User {
  first_name: string
  last_name: string
  email: string
  is_staff: boolean
  is_active: boolean
}
