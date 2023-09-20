import React from "react"
import Button from "./Button"

interface EmptyStateProps {
  title: string
  description: string
  buttonLabel: string
  onButtonClick?: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-10 rounded-lg">
      <div className="text-3xl font-semibold text-gray-700 mb-4">{title}</div>
      <div className="text-gray-600 mb-6">{description}</div>
      {onButtonClick && <Button onClick={onButtonClick}>{buttonLabel}</Button>}
    </div>
  )
}

export default EmptyState
