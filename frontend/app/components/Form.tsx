import { useActionData, useNavigation, useSubmit, Form as RemixForm } from "@remix-run/react"
import { FormProps, FormSchema, createForm } from "remix-forms"

const BaseForm = createForm({ component: RemixForm, useNavigation, useSubmit, useActionData })
function Form<Schema extends FormSchema>(props: FormProps<Schema>) {
  return (
    <BaseForm<Schema>
      // className={/* your form classes */}
      // fieldComponent={/* your custom Field */}
      // labelComponent={/* your custom Label */}
      // inputComponent={/* your custom Input */}
      // multilineComponent={/* your custom Multiline */}
      // selectComponent={/* your custom Select */}
      // checkboxComponent={/* your custom Checkbox */}
      // checkboxWrapperComponent={/* your custom checkbox wrapper */}
      // buttonComponent={/* your custom Button */}
      // fieldErrorsComponent={/* your custom FieldErrors */}
      // globalErrorsComponent={/* your custom GlobalErrors */}
      // errorComponent={/* your custom Error */}
      {...props}
    />
  )
}
export { Form }