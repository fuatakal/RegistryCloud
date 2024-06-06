'use client'

import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { User } from '@/types'
import { useGetAllUser } from '@/hooks/user'
import { useAtom } from 'jotai'
import userAtom from '@/atoms/userInfoAtom'
import Loading from './Loading'
import currentProjectAtom from '@/atoms/currentProjectAtom'
import { useProjectHooks } from '@/hooks/project'
import { GrAdd } from 'react-icons/gr'

interface AddExecutiveBtnProps {
  projectId: number
}

const AddExecutiveBtn = ({ projectId }: AddExecutiveBtnProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [currentUser] = useAtom(userAtom)
  const [currentProject] = useAtom(currentProjectAtom)

  const handleToggle = () => setIsOpen((prev) => !prev)

  const { addExecutiveToProject } = useProjectHooks()

  const addExecutiveSchema = yup.object().shape({
    editors: yup.array().of(yup.number().required()).required(),
    viewers: yup.array().of(yup.number().required()).required(),
  })

  type AddExecutiveSchemaProps = yup.InferType<typeof addExecutiveSchema>

  const form = useForm<AddExecutiveSchemaProps>({
    resolver: yupResolver(addExecutiveSchema),
    mode: 'onSubmit',
    defaultValues: {
      editors: currentProject?.editors || [],
      viewers: currentProject?.executives || [],
    },
  })

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await useGetAllUser()
      setUsers(allUsers)
      setLoading(false)
    }
    getAllUsers()
  }, [])

  useEffect(() => {
    form.reset({
      editors: currentProject?.editors || [],
      viewers: currentProject?.executives || [],
    })
  }, [form, isOpen])

  useEffect(() => {
    const result = users.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(result)
  }, [searchTerm, users])

  const handleSubmit = async (values: AddExecutiveSchemaProps) => {
    await addExecutiveToProject(projectId, values.viewers, values.editors)
    window.location.reload()
  }

  if (!currentUser || loading) return <Loading />

  return (
    <div>
      <button className="btn btn-info" onClick={() => setIsOpen(true)}>
        Add Executive <GrAdd />
      </button>
      <Modal isOpen={isOpen}>
        <div className="flex flex-col justify-center">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">Add Executive</h3>
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
              name="editors"
              render={({ field }) => (
                <div>
                  <h4 className="font-semibold">Editors</h4>
                  {filteredUsers
                    .filter(
                      (user) => user.is_staff && user.id !== currentUser.id
                    )
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
                              form.setValue('viewers', [
                                ...form.getValues('viewers'),
                                numberValue,
                              ]) // Ensure editors are also viewers
                            } else {
                              field.onChange(
                                field.value.filter(
                                  (item) => item !== numberValue
                                )
                              )
                              form.setValue(
                                'viewers',
                                form
                                  .getValues('viewers')
                                  .filter((item) => item !== numberValue)
                              ) // Remove from viewers if unchecked
                            }
                          }}
                          type="checkbox"
                          className="checkbox"
                          value={user.id}
                          checked={field.value?.includes(user.id)}
                        />
                      </label>
                    ))}
                </div>
              )}
            />

            <Controller
              control={form.control}
              name="viewers"
              render={({ field }) => (
                <div>
                  <h4 className="font-semibold">Viewers</h4>
                  {filteredUsers
                    .filter(
                      (user) => user.is_staff && user.id !== currentUser.id
                    )
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
                          checked={
                            field.value?.includes(user.id) ||
                            form.getValues('editors').includes(user.id)
                          } // Ensure editors are checked in viewers
                          disabled={form.getValues('editors').includes(user.id)} // Disable checkbox for editors
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
              Add Executive
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default AddExecutiveBtn
