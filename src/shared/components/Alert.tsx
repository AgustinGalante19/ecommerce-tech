import { X } from "lucide-react"

const Alert = ({
  onClose,
  variant,
  message,
}: {
  onClose?: () => void
  variant: "success" | "error"
  message?: string
}) => {
  {
  }
  return (
    <div
      className={`flex w-full p-4 rounded-md my-2 bg-opacity-20 ${
        variant === "success" ? "bg-[#40c057]" : "bg-[#fa5252]"
      }`}
    >
      <div className='flex justify-between w-full'>
        <div>
          <p
            className={`font-semibold ${
              variant === "success" ? "text-green-500" : "text-red-600"
            }`}
          >
            {message}
          </p>
        </div>
        <button onClick={onClose}>
          <X
            size={16}
            color={variant === "success" ? "rgb(34 197 94)" : "rgb(220 38 38)"}
          />
        </button>
      </div>
    </div>
  )
}

export default Alert
