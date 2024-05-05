import axios from 'axios'

export const getFormbyId = async (id: string) => {
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
