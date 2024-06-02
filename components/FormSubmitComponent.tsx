'use client'

import { alertStateAtom } from '@/atoms/alertAtom'
import { useFormHooks } from '@/hooks/form'
import { SubmitFormProps } from '@/types'
import { FormElementInstance, FormElements } from '@/types/form-elements'
import { useAtom } from 'jotai'
import React, { useCallback, useRef, useState, useTransition } from 'react'
import { BiSend } from 'react-icons/bi'
import { ImSpinner2 } from 'react-icons/im'
function FormSubmitComponent({
  formId,
  content,
}: {
  content: FormElementInstance[]
  formId: string
}) {
  const formValues = useRef<SubmitFormProps[]>([])
  const formErrors = useRef<{ [key: number]: boolean }>({})
  const [renderKey, setRenderKey] = useState(new Date().getTime())

  const [submitted, setSubmitted] = useState(false)
  const [pending, startTransition] = useTransition()

  const [, setAlert] = useAtom(alertStateAtom)

  const { submitForm } = useFormHooks()

  const validateForm = useCallback(() => {
    for (const field of content) {
      const actualValue =
        formValues.current.find((item) => item.question === Number(field.id))
          ?.answer || ''
      console.log(actualValue)
      const valid = FormElements[field.type].validate(field, actualValue)

      if (!valid) {
        formErrors.current[parseInt(field.id)] = true
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false
    }

    return true
  }, [content])

  const submitValue = useCallback((question: number, answer: string) => {
    const index = formValues.current.findIndex(
      (item) => item.question === question
    )
    if (index !== -1) {
      formValues.current[index].answer = answer
    } else {
      formValues.current.push({ question, answer })
    }
  }, [])

  const handleSubmitForm = async () => {
    formErrors.current = {}
    const validForm = validateForm()
    if (!validForm) {
      setRenderKey(new Date().getTime())
      return
    }

    try {
      const jsonContent = JSON.stringify(formValues.current)
      console.log(jsonContent)
      await submitForm(formValues.current, formId)
      setSubmitted(true)
      setAlert({
        isVisible: true,
        message: 'Succes',
        variant: 'success',
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border bg-base-100 shadow-xl shadow-accent rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center w-full h-full my-32 items-center p-8">
      <div
        key={renderKey}
        className="max-w-[820px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id as unknown as number]}
              defaultValue={
                formValues.current.find(
                  (item) => item.question.toString() === element.id
                )?.answer || ''
              }
            />
          )
        })}
        <button
          className="btn btn-primary btn-outline mt-8 w-[10rem] self-end"
          onClick={() => {
            startTransition(handleSubmitForm)
          }}
          disabled={pending}
        >
          {!pending && (
            <div className="mr-2 flex">
              Submit
              <BiSend />
            </div>
          )}
          {pending && <ImSpinner2 />}
        </button>
      </div>
    </div>
  )
}

export default FormSubmitComponent
