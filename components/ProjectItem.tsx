import React from 'react'

interface ProjectItemProps {
  name: string
  description: string
  onClick: () => void
}

const ProjectItem = ({ name, description, onClick }: ProjectItemProps) => {
  return (
    <li
      className="my-4 cursor-pointer transition-transform duration-300 transform hover:scale-105"
      onClick={onClick}
    >
      <div className="flex py-2 px-4 bg-base-100 h-20 w-full border-1 border-neutral rounded-xl shadow-lg ml-4 relative">
        <span className="text-neutral text-lg font-semibold flex items-center justify-center h-full">
          Project: {name}
        </span>
        <p className=" self-end mb-4 ml-8 text-sm font-light">{description}</p>
      </div>
    </li>
  )
}

export default ProjectItem
