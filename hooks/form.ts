import axios from 'axios'

export const useFormApi = () => {
  const getFormbyId = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/forms/${id}`, {
        headers: {
          // Add your headers here
          'Content-Type': 'application/json',
          // Example: Authorization header
          // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        },
      })
      return response.data
    } catch (error) {
      // Handle any network error or invalid response
      console.error('getFormById error:', error)
    }
  }

  const createForm = async (name: string, description: string) => {
    try {
      const accessToken = localStorage.getItem('jwtToken')
      const response = await axios.post(
        `http://localhost:8000/forms/`,
        { name: name, description: description },
        {
          headers: {
            // Add your headers here
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      console.log(response.data)
      return response.data
    } catch (error) {
      // Handle any network error or invalid response
      console.error('createForm error:', error)
    }
  }

  const getForms = async () => {
    try {
      const accessToken = localStorage.getItem('jwtToken')
      const response = await axios.get(`http://localhost:8000/forms/`, {
        headers: {
          // Add your headers here
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return response.data
    } catch (error) {
      // Handle any network error or invalid response
      console.error('createForm error:', error)
    }
  }
  return { getFormbyId, createForm, getForms }
}
