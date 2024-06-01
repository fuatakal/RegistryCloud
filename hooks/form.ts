import { useAtom } from 'jotai'
import { Form, SubmitFormProps } from '@/types'
import tokenAtom from '@/atoms/tokenAtom'

export const useFormHooks = () => {
  const [token] = useAtom(tokenAtom)

  const getFormById = async (id: number) => {
    const response = await fetch(`http://localhost:8000/forms/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  }

  const createForm = async (name: string, description: string) => {
    if (!token) throw new Error('No token available')
    try {
      const response = await fetch(`http://localhost:8000/forms/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
      })
      const data = await response.json()
      console.log(data)
      return data
    } catch (error) {
      console.error('createForm error:', error)
    }
  }

  const editForm = async (id: string, form: Form) => {
    if (!token) throw new Error('No token available')
    try {
      const response = await fetch(`http://localhost:8000/forms/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
      console.log(await response.json())
    } catch (error) {
      console.error('editForm error:', error)
    }
  }

  const publishForm = async (users: { attender: number }[], formId: number) => {
    if (!token) throw new Error('No token available')
    try {
      await fetch(`http://localhost:8000/forms/${formId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ attenders: users }),
      })
    } catch (error) {
      console.error('publishForm error:', error)
    }
  }

  const getForms = async () => {
    if (!token) throw new Error('No token available')
    try {
      const response = await fetch(`http://localhost:8000/forms/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('getForms error:', error)
    }
  }

  const getAttendedForms = async () => {
    if (!token) throw new Error('No token available')
    try {
      const response = await fetch(`http://localhost:8000/forms/attended`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('getAttendedForms error:', error)
    }
  }

  const getFormAnswers = async (form_id: string) => {
    if (!token) throw new Error('No token available')
    try {
      const response = await fetch(
        `http://localhost:8000/forms/deliveries/${form_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      return data
    } catch (error) {
      console.error('getFormAnswers error:', error)
    }
  }

  const submitForm = async (answers: SubmitFormProps[], formId: string) => {
    if (!token) throw new Error('No token available')
    try {
      await fetch(`http://localhost:8000/forms/fill/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers: answers, isSubmitted: true }),
      })
    } catch (error) {
      console.error('submitForm error:', error)
    }
  }

  const deleteForm = async (id: number) => {
    if (!token) throw new Error('No token available')
    try {
      const response = await fetch(
        `http://localhost:8000/forms/form-delete/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      return data
    } catch (error) {
      console.error('deleteForm error:', error)
    }
  }

  return {
    getFormById,
    createForm,
    editForm,
    publishForm,
    getForms,
    getAttendedForms,
    getFormAnswers,
    submitForm,
    deleteForm,
  }
}
