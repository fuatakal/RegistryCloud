'use client'

import React from 'react'
import cn from 'classnames'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
}

const Modal = ({ children, isOpen }: ModalProps) => {
  const modalClass = cn({
    'modal modal-bottom sm:modal-middle': true,
    'modal-open': isOpen,
  })

  return (
    <div className={modalClass}>
      <div className="modal-box">{children}</div>
    </div>
  )
}

export default Modal
