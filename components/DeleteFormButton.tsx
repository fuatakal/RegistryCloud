'use client'

import React, { useState } from 'react'
import Modal from './Modal'
import { FaTrash } from 'react-icons/fa6'

interface DeleteBtnProps {
  formId: number
  handleDelete: (formId: number) => void
}

const DeleteBtn = ({ formId, handleDelete }: DeleteBtnProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggle = () => setIsOpen((prev) => !prev)

  return (
    <div>
      <button
        className="btn btn-error btn-outline"
        onClick={() => setIsOpen(true)}
      >
        Delete <FaTrash />
      </button>
      <Modal isOpen={isOpen}>
        <div className="flex flex-col justify-center">
          <div className="flex justify-between ">
            <h3 className="font-bold text-lg">Delete Form</h3>

            <button
              className="btn btn-circle btn-xs btn-outline"
              onClick={handleToggle}
            >
              X
            </button>
          </div>
          <div className=" divider divider-neutral mb-6" />

          <p className="my-4">
            This form will be deleted, Ths procces cant be undone!
          </p>

          <button
            className="btn btn-outline btn-error mt-4 self-end w-[8rem]"
            onClick={() => {
              handleDelete(formId)
            }}
          >
            Delete <FaTrash />
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteBtn
