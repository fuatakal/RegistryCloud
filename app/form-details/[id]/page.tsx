'use client'

import currentFormAtom from '@/atoms/currentFormAtom'
import executiveAtom from '@/atoms/executiveAtom'
import projectIdAtom from '@/atoms/selectedProject'
import userAtom from '@/atoms/userInfoAtom'
import CreateFormBtn from '@/components/CreateFormBtn'
import DashboardFormItem from '@/components/DashboardFormItem'
import GoBackButton from '@/components/GoBackButton'
import Loading from '@/components/Loading'
import StatsCard from '@/components/StatsCard'
import { useFormHooks } from '@/hooks/form'
import { AttendedForm, Form, FormSubmit } from '@/types'
import { useAtom } from 'jotai'

import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { DownloadTableExcel } from 'react-export-table-to-excel'
import { FaArrowAltCircleRight, FaEdit } from 'react-icons/fa'
import { LuView } from 'react-icons/lu'

interface DetailsProps {
  params: { id: string }
}

function DetailsPage({ params }: DetailsProps) {
  const { id } = params
  const router = useRouter()

  const tableRef = useRef(null)

  const [form, setForm] = useState<Form>()
  const [attendedForms, setAttendedForms] = useState<AttendedForm[]>()
  const [detailForms, setDetailForms] = useState<Form[]>([])
  const [submits, setSubmits] = useState<FormSubmit[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [user] = useAtom(userAtom)
  const [projectId] = useAtom(projectIdAtom)
  const [, setCurrentForm] = useAtom(currentFormAtom)
  const [executive] = useAtom(executiveAtom)

  const { getFormById, getFormAnswers, getFormsOfMaster, getAttendedForms } =
    useFormHooks()

  const visit = (id: number) => {
    router.push(`/submit/${id.toString()}`)
  }
  const preview = (id: number) => {
    router.push(`/preview/${id.toString()}`)
  }

  const onClickForm = (id: number) => {
    router.push(`/form-details/${id.toString()}`)
  }

  useEffect(() => {
    const getForm = async () => {
      const response1 = await getFormById(Number(id))
      setForm(response1)
      setCurrentForm(response1)
      const response2 = await getFormsOfMaster(response1.id)
      setDetailForms(response2)
      const response3 = await getAttendedForms()
      setAttendedForms(response3)
    }

    const getAnswers = async () => {
      const response = await getFormAnswers(id)
      setSubmits(response)
      setLoading(false)
    }

    getForm()
    getAnswers()
    console.log(form)
  }, [])

  useEffect(() => {
    const foundForm = attendedForms?.find((form) => form.form === Number(id))
    setIsSubmitted(foundForm ? foundForm.isSubmitted : false)
    console.log(foundForm)
  }, [attendedForms])

  if (loading) return <Loading />

  if (form) {
    return (
      <>
        <div className="py-10 px-5 border-b border-muted">
          <GoBackButton />
          <div className="flex justify-between container mt-2">
            <div className="flex gap-6 items-center">
              <h1 className="text-4xl font-bold truncate">{form.name}</h1>
              {user?.is_staff && (
                <button
                  className="btn btn-primary btn-outline"
                  onClick={() => preview(form.id as number)}
                >
                  Preview <FaArrowAltCircleRight size={16} />
                </button>
              )}
              {!user?.is_staff && !isSubmitted && (
                <button
                  className="btn btn-primary btn-outline"
                  onClick={() => visit(form.id as number)}
                >
                  Visit <FaArrowAltCircleRight size={16} />
                </button>
              )}
              {!user?.is_staff && isSubmitted && (
                <button
                  className="btn btn-primary btn-outline"
                  disabled
                  onClick={() => visit(form.id as number)}
                >
                  Submitted
                </button>
              )}
            </div>

            <div className="flex gap-6 justify-center items-center">
              {user?.is_staff && executive && (
                <button
                  className="btn btn-accent"
                  onClick={() => {
                    router.push(`/form-builder/${id}`)
                  }}
                >
                  Edit <FaEdit size={16} />
                </button>
              )}
              {form.is_master && user?.is_staff && (
                <>
                  {executive && (
                    <CreateFormBtn
                      projectId={projectId as number}
                      master_form_id={form.id}
                    />
                  )}

                  <DownloadTableExcel
                    filename={`${form.name}_answers`}
                    sheet="answers"
                    currentTableRef={tableRef.current}
                  >
                    <button className="btn btn-info"> Export excel </button>
                  </DownloadTableExcel>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="py-5 px-10 border-b border-muted">
          <div className="container flex gap-2 items-center justify-between"></div>
        </div>
        <div className="w-[400px] pt-8 gap-4 stats self-center mt-2  shadow">
          <StatsCard
            title="Total Submits"
            icon={<LuView size={48} />}
            helperText="All time form submits"
            value={submits.length.toString()}
            loading={false}
            className="shadow-md shadow-blue-600"
            type={''}
          />
        </div>
        <div className=" divider divider-neutral my-4" />
        <div role="tablist" className="tabs tabs-bordered self-center mb-4">
          {user?.is_staff && (
            <>
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab"
                aria-label="Answers"
                defaultChecked={!form.is_master}
              />
              <div role="tabpanel" className="tab-content p-10 min-w-[50rem]">
                <div className="overflow-x-auto px-8">
                  <h1 className=" text-xl font-bold ml-8">
                    Attenders and answers
                  </h1>
                  <div className=" divider" />
                  <table className="table" ref={tableRef}>
                    <thead>
                      <tr>
                        <th>User</th>
                        {form.questions?.map((item) => (
                          <th key={item.id}>
                            {item.extraAttributes.label as string}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {submits.map((item, index) => (
                        <tr key={index} className="hover">
                          <th>{item.deliveryman_email}</th>
                          {item.answers.map((field) => (
                            <td key={`${item.deliveryman}`}>
                              {field.answer || ' '}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          {form.is_master && (
            <>
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab"
                aria-label="Detail Forms"
                defaultChecked={form.is_master}
              />
              <div role="tabpanel" className="tab-content p-10 min-w-[50rem]">
                <h1 className=" text-xl font-bold ml-8">Detail Forms</h1>
                <div className=" divider" />
                <ul>
                  {detailForms.map((child) => (
                    <DashboardFormItem
                      key={child.id}
                      form={child}
                      onClick={onClickForm}
                    />
                  ))}
                </ul>
              </div>{' '}
            </>
          )}
        </div>
      </>
    )
  }
}

export default DetailsPage
