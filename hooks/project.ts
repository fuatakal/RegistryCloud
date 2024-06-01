import { useAtom } from 'jotai'
import { Project } from '@/types'
import tokenAtom from '@/atoms/tokenAtom'

export const useProjectHooks = () => {
  const [token] = useAtom(tokenAtom)

  const getProjects = async () => {
    if (!token) throw new Error('No token available')
    const response = await fetch(`http://localhost:8000/forms/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  }

  const getProject = async (id: string) => {
    if (!token) throw new Error('No token available')
    const response = await fetch(`http://localhost:8000/forms/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  }

  const deleteProject = async (id: string) => {
    if (!token) throw new Error('No token available')
    await fetch(`http://localhost:8000/forms/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  const getProjectForms = async (id: string) => {
    const response = await fetch(
      `http://localhost:8000/forms/forms_of_project/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.json()
  }

  const createProject = async (project: Project) => {
    if (!token) throw new Error('No token available')
    console.log(JSON.stringify(project))
    try {
      const response = await fetch(`http://localhost:8000/forms/projects/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(project),
      })
      return response.json()
    } catch (error) {
      console.error('createForm error:', error)
    }
  }

  const editProject = async (project: Project) => {
    if (!token) throw new Error('No token available')
    try {
      const response = await fetch(
        `http://localhost:8000/forms/projects/${project.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(project),
        }
      )
      return response.json()
    } catch (error) {
      console.error('editForm error:', error)
    }
  }

  return {
    getProjects,
    getProject,
    deleteProject,
    getProjectForms,
    createProject,
    editProject,
  }
}
