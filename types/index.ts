import { FormElementInstance } from './form-elements'

export interface NavLink {
  href: string
  name: string
  key: string
}

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  is_staff: boolean
  is_active: boolean
}

export interface Attender {
  attender: number
  isSubmitted: boolean
}

export interface Project {
  id: number
  atributes: {
    name: string
    desc: string
  }
  forms: number[]
  executives: number[]
}

export interface Form {
  id?: number
  name?: string
  description?: string
  creator?: number
  questions?: FormElementInstance[]
  attenders?: Attender[]
}

export interface SubmitFormProps {
  question: number
  answer: string
}

export interface AttendedForm {
  form: number
  isSubmitted: boolean
  formName: string
  formDescription: string
}

export interface FormSubmit {
  deliveryman_email: string
  id: number
  form: number
  deliveryman: number
  answers: SubmitFormProps[]
  created_at: string
}
