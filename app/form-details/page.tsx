import React from 'react'

interface DetailsProps {
  params: { id: string }
}

async function DetailsPage({ params }: Detailsrops) {
  const { id } = params

  //const form = await getFormbyId(id);

  return <div />
}

export default DetailsPage
