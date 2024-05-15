'use client'

import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { User } from '@/types'
import { useGetAllUser } from '@/hooks/user'
import { FaShare } from 'react-icons/fa6'
import { useAtom } from 'jotai'
import userAtom from '@/atoms/userInfoAtom'
import { usePublishForm } from '@/hooks/form'
import currentFormAtom from '@/atoms/currentFormAtom'

interface PublishBtnProps {
  formId: number
}

const PublishBtn = ({ formId }: PublishBtnProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [currentUser, setCurrentUser] = useAtom(userAtom)
  const [currentForm] = useAtom(currentFormAtom)

  const handleToggle = () => setIsOpen((prev) => !prev)

  const publishSchema = yup.object().shape({
    users: yup.array().min(1).of(yup.number().required()).required(),
  })

  type publishSchemaProps = yup.InferType<typeof publishSchema>

  const form = useForm<publishSchemaProps>({
    resolver: yupResolver(publishSchema),
    mode: 'onSubmit',
    defaultValues: {
      users: currentForm?.attenders,
    },
  })

  useEffect(() => {
    const getAllUsers = async () => {
      setUsers(await useGetAllUser())
    }
    const getCurrentUser = async () => {
      const userFromStorage = JSON.parse(
        localStorage.getItem('user') || 'null'
      ) as User
      setCurrentUser(userFromStorage)
      setLoading(false)
    }
    getAllUsers()
    getCurrentUser()
  }, [])

  useEffect(() => {
    form.reset({ users: [] })
  }, [form, isOpen])

  const handleSubmit = async (values: publishSchemaProps) => {
    const parsedUsers = values.users.map((userId) => {
      return { attender: userId }
    })
    await usePublishForm(parsedUsers, formId)
    handleToggle()
  }

  if (!formId || !currentUser || loading) return

  return (
    <div>
      <button
        className="btn btn-primary btn-outline"
        onClick={() => setIsOpen(true)}
      >
        Publish <FaShare />
      </button>
      <Modal isOpen={isOpen}>
        <div className="flex flex-col justify-center">
          <div className="flex justify-between ">
            <h3 className="font-bold text-lg">Create Form</h3>
            <button
              className="btn btn-circle btn-xs btn-outline"
              onClick={handleToggle}
            >
              X
            </button>
          </div>
          <div className=" divider divider-neutral mb-6" />

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <Controller
              control={form.control}
              name="users"
              render={({ field }) => (
                <div>
                  {users
                    .filter((user) => user.email !== currentUser.email)
                    .map((user, index) => (
                      <label key={index} className="label cursor-pointer">
                        <span className="label-text">{user.email}</span>
                        <input
                          onChange={(e) => {
                            const { checked, value } = e.target
                            if (checked) {
                              field.onChange([...field.value, value])
                            } else {
                              field.onChange(
                                field.value.filter(
                                  (item) => item !== Number(value)
                                )
                              )
                            }
                          }}
                          type="checkbox"
                          className="checkbox"
                          value={user.id}
                        />
                      </label>
                    ))}
                </div>
              )}
            />

            <button
              className="btn btn-primary btn-outline w-[10rem] place-self-end mt-4"
              type="submit"
            >
              Publish Form
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default PublishBtn
