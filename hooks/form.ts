import { Form, SubmitFormProps } from '@/types'

export const useGetFormbyId = async (id: number) => {
  const response = await fetch(`http://localhost:8000/forms/${id}`, {
    method: 'GET',
    headers: {
      // Add your headers here
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}

export const useCreateForm = async (name: string, description: string) => {
  try {
    const accessToken = localStorage.getItem('jwtToken')
    const response = await fetch(`http://localhost:8000/forms/`, {
      method: 'POST',
      headers: {
        // Add your headers here
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, description }),
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    // Handle any network error or invalid response
    console.error('createForm error:', error)
  }
}

export const useEditForm = async (id: string, form: Form) => {
  try {
    const accessToken = localStorage.getItem('jwtToken')
    console.log(form)
    const response = await fetch(`http://localhost:8000/forms/${id}`, {
      method: 'PUT',
      headers: {
        // Add your headers here
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(form),
    })
    console.log(response.json())
  } catch (error) {
    // Handle any network error or invalid response
    console.error('createForm error:', error)
  }
}

export const usePublishForm = async (
  users: { attender: number }[],
  formId: number
) => {
  try {
    const accessToken = localStorage.getItem('jwtToken')
    console.log(users)
    await fetch(`http://localhost:8000/forms/${formId}`, {
      method: 'PUT',
      headers: {
        // Add your headers here
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ attenders: users }),
    })
  } catch (error) {
    // Handle any network error or invalid response
    console.error('createForm error:', error)
  }
}

export const useGetForms = async () => {
  try {
    const accessToken = localStorage.getItem('jwtToken')
    const response = await fetch(`http://localhost:8000/forms/`, {
      method: 'GET',
      headers: {
        // Add your headers here
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    // Handle any network error or invalid response
    console.error('getForms error:', error)
  }
}

export const useGetAttendedForms = async () => {
  try {
    const accessToken = localStorage.getItem('jwtToken')
    const response = await fetch(`http://localhost:8000/forms/attended`, {
      method: 'GET',
      headers: {
        // Add your headers here
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    // Handle any network error or invalid response
    console.error('getForms error:', error)
  }
}

export const useGetFormAnswers = async (form_id: string) => {
  try {
    const accessToken = localStorage.getItem('jwtToken')
    const response = await fetch(
      `http://localhost:8000/forms/deliveries/${form_id}`,
      {
        method: 'GET',
        headers: {
          // Add your headers here
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    // Handle any network error or invalid response
    console.error('getForms error:', error)
  }
}

export const useSubmitForm = async (
  answers: SubmitFormProps[],
  formId: string
) => {
  try {
    const accessToken = localStorage.getItem('jwtToken')
    console.log(answers)
    await fetch(`http://localhost:8000/forms/fill/${formId}`, {
      method: 'POST',
      headers: {
        // Add your headers here
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ answers: answers, isSubmitted: true }),
    })
  } catch (error) {
    // Handle any network error or invalid response
    console.error('submitform error:', error)
  }
}

export const useDeleteForm = async (id: number) => {
  try {
    const accessToken = localStorage.getItem('jwtToken')
    const response = await fetch(
      `http://localhost:8000/forms/form-delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('deleteForm error:', error)
  }
}
