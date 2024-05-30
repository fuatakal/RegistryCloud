import { Project } from '@/types'

export const useGetProjects = async () => {
  const accessToken = localStorage.getItem('jwtToken')
  const response = await fetch(
    `http://localhost:8000/forms/deliveries/forms/projects`,
    {
      method: 'GET',
      headers: {
        // Add your headers here
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
    }
  )

  return response.json()
}

export const useGetProject = async (id: number) => {
  const accessToken = localStorage.getItem('jwtToken')
  const response = await fetch(`http://localhost:8000/forms/projects/${id}`, {
    method: 'GET',
    headers: {
      // Add your headers here
      'Content-Type': 'application/json',
      Authorization: `${accessToken}`,
    },
  })

  return response.json()
}

export const useDeleteProject = async (id: number) => {
  const accessToken = localStorage.getItem('jwtToken')
  const response = await fetch(`http://localhost:8000/forms/projects/${id}`, {
    method: 'DELETE',
    headers: {
      // Add your headers here
      'Content-Type': 'application/json',
      Authorization: `${accessToken}`,
    },
  })

  return response.json()
}

export const useGetProjectForms = async (id: number) => {
  const accessToken = localStorage.getItem('jwtToken')
  const response = await fetch(
    `http://localhost:8000/forms/forms_of_project/${id}`,
    {
      method: 'DELETE',
      headers: {
        // Add your headers here
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
    }
  )

  return response.json()
}

export const useCreateProject = async (project: Project) => {
  try {
    const accessToken = localStorage.getItem('jwtToken')
    const response = await fetch(`http://localhost:8000/forms/projects/`, {
      method: 'POST',
      headers: {
        // Add your headers here
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify(project),
    })
    const data = await response.json()
    return data
  } catch (error) {
    // Handle any network error or invalid response
    console.error('createForm error:', error)
  }
}

export const useEditProject = async (project: Project) => {
  try {
    const accessToken = localStorage.getItem('jwtToken')
    const response = await fetch(
      `http://localhost:8000/forms/projects/${project.id}`,
      {
        method: 'PUT',
        headers: {
          // Add your headers here
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(project),
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    // Handle any network error or invalid response
    console.error('createForm error:', error)
  }
}
