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
import { useFormHooks } from '@/hooks/form'
import currentFormAtom from '@/atoms/currentFormAtom'
import Loading from './Loading'
import { alertStateAtom } from '@/atoms/alertAtom'

interface PublishBtnProps {
  formId: number
}

const PublishBtn = ({ formId }: PublishBtnProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [currentUser] = useAtom(userAtom)
  const [currentForm] = useAtom(currentFormAtom)
  const [, setAlert] = useAtom(alertStateAtom)

  const handleToggle = () => setIsOpen((prev) => !prev)

  const { publishForm } = useFormHooks()

  const publishSchema = yup.object().shape({
    users: yup.array().min(1).of(yup.number().required()).required(),
  })

  type publishSchemaProps = yup.InferType<typeof publishSchema>

  const form = useForm<publishSchemaProps>({
    resolver: yupResolver(publishSchema),
    mode: 'onSubmit',
    defaultValues: {
      users: currentForm?.attenders?.map((attender) => attender.attender),
    },
  })

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await useGetAllUser()
      setUsers(allUsers)
      setFilteredUsers(allUsers)
      setLoading(false)
    }
    getAllUsers()
  }, [])

  useEffect(() => {
    form.reset({
      users: currentForm?.attenders?.map((attender) => attender.attender),
    })
  }, [form, isOpen])

  useEffect(() => {
    const result = users.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(result)
  }, [searchTerm, users])

  const handleSubmit = async (values: publishSchemaProps) => {
    const parsedUsers = values.users.map((userId) => {
      return { attender: userId }
    })
    await publishForm(parsedUsers, formId)
    window.location.reload()
    setAlert({
      isVisible: true,
      message: `Form published!`,
      variant: 'success',
    })
  }

  if (!formId || !currentUser || loading) return <Loading />

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
            <h3 className="font-bold text-lg">Publish Form</h3>
            <button
              className="btn btn-circle btn-xs btn-outline"
              onClick={handleToggle}
            >
              X
            </button>
          </div>
          <div className="divider divider-neutral mb-6" />

          <input
            type="text"
            className="input input-bordered mb-4"
            placeholder="Search user"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <Controller
              control={form.control}
              name="users"
              render={({ field }) => (
                <div>
                  {filteredUsers
                    .filter((user) => user.email !== currentUser.email)
                    .map((user, index) => (
                      <label key={index} className="label cursor-pointer">
                        <span className="label-text">{user.email}</span>
                        <input
                          {...field}
                          onChange={(e) => {
                            const { checked, value } = e.target
                            const numberValue = Number(value)
                            if (checked) {
                              field.onChange([...field.value, numberValue])
                            } else {
                              field.onChange(
                                field.value.filter(
                                  (item) => item !== numberValue
                                )
                              )
                            }
                          }}
                          type="checkbox"
                          className="checkbox"
                          value={user.id}
                          checked={field.value.includes(user.id)}
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
