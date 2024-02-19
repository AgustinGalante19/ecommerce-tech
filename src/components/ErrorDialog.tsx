import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import { AlertTriangle } from "lucide-react"

interface Props {
  isOpen: boolean
  closeAlert: () => void
  content: {
    title: string
    message: string
  }
}

function ErrorDialog({ isOpen, closeAlert, content }: Props) {
  return (
    <AlertDialog.Root open={isOpen} onOpenChange={closeAlert}>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>
          <Flex>
            <AlertTriangle className='mr-2' />
            {content.title}
          </Flex>
        </AlertDialog.Title>
        <AlertDialog.Description size='2'>
          {content.message}
        </AlertDialog.Description>

        <Flex gap='3' mt='4' justify='end'>
          <AlertDialog.Action>
            <Button variant='solid' color='red'>
              Ok
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
export default ErrorDialog
