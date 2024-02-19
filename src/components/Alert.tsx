import { X } from "lucide-react"
import { twMerge } from "tailwind-merge"

interface Props {
  onClose: () => void
  variant: "success" | "error"
  message: string
}
function Alert({ onClose, variant, message }: Props) {
  console.log(variant === "success")
  return (
    <div
      className={twMerge(
        "flex w-full p-4 rounded-md my-2",
        variant === "success" ? "bg-[#DAF7A6]" : "bg-[#fa5252]"
      )}
    >
      <div className='flex justify-between w-full'>
        <div>
          <p
            className={twMerge(
              "font-semibold",
              variant === "success" ? "text-green-900" : "text-white"
            )}
          >
            {message}
          </p>
        </div>
        <button onClick={onClose}>
          <X
            size={16}
            color={variant === "success" ? "rgb(20 83 45)" : "#fff"}
          />
        </button>
      </div>
    </div>
  )
}

export default Alert
