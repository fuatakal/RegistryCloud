import formElementsAtom from '@/atoms/formElementsAtom'
import { FormElementInstance } from '@/types/form-elements'
import { useAtom } from 'jotai'

export const useFormActions = () => {
  const [, setElements] = useAtom(formElementsAtom)

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev]
      const index = newElements.findIndex((val) => val.id === id)
      newElements[index] = element
      return newElements
    })
  }

  const addElement = (index: number, newElement: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev]
      newElements.splice(index, 0, newElement)
      return newElements
    })
  }

  return { updateElement, addElement }
}
