export const useGetAllUser = async () => {
  const response = await fetch(`http://localhost:8000/users/all`, {
    method: 'GET',
    headers: {
      // Add your headers here
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}
