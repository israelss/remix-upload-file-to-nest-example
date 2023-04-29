import { fileSchema } from "~/schemas/fileSchema"
import { Form } from "./Form"
import { FileUpload } from "./FileUpload"
import { Controller } from "react-hook-form"
import { Button, TextField } from "@mui/material"
import { DateField, TimeField } from "@mui/x-date-pickers"

type FileFormProps = {
  resetForm: boolean;
  setResetForm: (value: boolean) => void;
}

export const FileForm = ({ resetForm, setResetForm }: FileFormProps) => {

  return (
    <Form
      schema={fileSchema}
      method="post"
      encType="multipart/form-data"
      onTransition={({ setFocus, reset, formState }) => {
        setResetForm(false)
        const { isSubmitSuccessful } = formState
        console.log({ isSubmitSuccessful })
        console.log({ clearForm: resetForm })

        if (isSubmitSuccessful && resetForm) {
          setFocus('email')
          reset()
        }
      }}
    >
      {({ Field, control, register }) => (
        <div className="flex flex-col p-10 border border-solid border-primary shadow-lg rounded w-80 h-96 items-center justify-center gap-4 bg-orange-50">
          <h1>Formulário de exemplo</h1>
          <Field name="email">
            {({ Errors }) => (
              <>
                <TextField type="email" {...register('email')} />
                <Errors />
              </>
            )}
          </Field>
          <Field name="file">
            {({ Errors }) => (
              <>
                <Controller
                  name='file'
                  control={control}
                  render={({ field }) => <FileUpload {...field} />}
                />
                <Errors />
              </>
            )}
          </Field>
          <Field name="fileDate">
            {({ Errors }) => (
              <>
                <Controller
                  name='fileDate'
                  control={control}
                  render={({ field }) => (
                    <DateField {...field} />
                  )}
                />
                <Errors />
              </>
            )}
          </Field>
          <Field name="fileTime">
            {({ Errors }) => (
              <>
                <Controller
                  name='fileTime'
                  control={control}
                  render={({ field }) => (
                    <TimeField {...field} format="HH:mm:ss" />
                  )}
                />
                <Errors />
              </>
            )}
          </Field>
          <Button variant='contained' type="submit">
            Enviar
          </Button>
        </div>
      )}
    </Form>
  )
}