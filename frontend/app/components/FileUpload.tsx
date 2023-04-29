import { forwardRef } from "react"

const FileUpload = forwardRef<HTMLInputElement>(function FileUpload(props, ref) {
  return (
    <>
      <input ref={ref} {...props} type='file' />
    </>
  )
})

export { FileUpload }