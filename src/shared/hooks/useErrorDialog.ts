import { useState } from "react"

export default function useErrorDialog() {
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false)
  const [content, setContent] = useState({
    title: "",
    message: "",
  })

  const changeContent = (newContent: { title: string; message: string }) =>
    setContent(newContent)

  const openErrorDialog = () => setIsErrorDialogOpen(true)
  const closeErrorDialog = () => setIsErrorDialogOpen(false)

  return {
    content,
    changeContent,
    openErrorDialog,
    closeErrorDialog,
    isErrorDialogOpen,
  }
}
