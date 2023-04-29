import { makeDomainFunction } from 'domain-functions'
import { fileSchema } from "~/schemas/fileSchema";
import { ActionArgs, defer, json, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { performMutation } from "remix-forms";
import { FileForm } from "~/components/FileForm";
import dayjs from 'dayjs';
import { Await, useActionData } from '@remix-run/react';
import { Suspense, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const mutation = makeDomainFunction(fileSchema)(async (values) => {
  const [hours, minutes, seconds] = values.fileTime.split(':')

  const datetime = dayjs(values.fileDate, 'DD/MM/YYYY')
    .add(hours, 'hours')
    .add(minutes, 'minutes')
    .add(seconds, 'seconds')
    .toISOString()

  return {
    file: values.file,
    email: values.email,
    datetime
  }
})


export const action = async ({ request }: ActionArgs) => {
  const formData = await unstable_parseMultipartFormData(
    request.clone(),
    unstable_createMemoryUploadHandler()
  )

  const file = formData.get('file') as File

  const result = await performMutation({
    request,
    schema: fileSchema,
    mutation
  })

  if (!result.success) return

  const data = new FormData()

  data.append('email', result.data.email)
  data.append('datetime', result.data.datetime)
  data.append('file', file)

  const apiResult = await fetch('http://localhost:3001/upload', {
    method: 'post',
    body: data
  })

  const apiData = await apiResult.json()
  const status = apiResult.status

  return defer({ data: apiData, status })
}

export default function UploadPage() {
  const data = useActionData<typeof action>();
  const [open, setOpen] = useState<boolean>(false);
  const [resetForm, setResetForm] = useState<boolean>(false);

  useEffect(() => {
    if (data !== undefined) {
      setOpen(true)
      if (data.data.status === 201) {
        setResetForm(true)
      } else {
        setResetForm(false)
      }
    }
  }, [data])


  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center bg-slate-50'>
      <Suspense fallback={null}>
        <Await resolve={data?.data}>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {
                data?.data.status === 201
                  ? "Sucesso"
                  : "Falha"
              }
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {<p>{data?.data.message}</p>}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Ok</Button>
            </DialogActions>
          </Dialog>
        </Await>
      </Suspense>
      <FileForm resetForm={resetForm} setResetForm={setResetForm} />
    </div>
  )
}