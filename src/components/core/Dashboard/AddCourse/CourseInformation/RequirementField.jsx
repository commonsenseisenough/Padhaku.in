import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions || [])
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList])

  const handleAddRequirement = () => {
    if (requirement.trim() !== "") {
      setRequirementsList([...requirementsList, requirement.trim()])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-white" htmlFor={name}>
        {label} <sup className="text-pink-500">*</sup>
      </label>

      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full rounded-md border border-gray-600 bg-gray-800 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter requirement"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="text-sm font-medium text-blue-400 hover:underline"
        >
          + Add
        </button>
      </div>

      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc space-y-1 text-white">
          {requirementsList.map((requirement, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{requirement}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="ml-2 text-xs text-red-400 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="ml-2 text-xs text-pink-500 tracking-wide">
          {label} is required
        </span>
      )}
    </div>
  )
}
