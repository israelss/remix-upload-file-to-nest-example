import dayjs from 'dayjs'
import { z } from 'zod'
import 'dayjs/locale/pt-br'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.locale('pt-br')
dayjs.extend(customParseFormat)

export const fileSchema = z.object({
  file: z.string().min(1),
  email: z.string().min(1).email(),
  fileDate: z.any()
    .transform((value, ctx) => {
      const isValidDate = dayjs(value, 'DD/MM/YYYY').isValid()
      if (!isValidDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_date,
          message: 'Data inválida'
        })
        return z.NEVER
      }
      return value
    }),
  fileTime: z.any()
    .transform((value, ctx) => {
      const isValidTime = dayjs(value, 'HH:mm:ss').isValid()
      if (!isValidTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_date,
          message: 'Hora inválida'
        })
        return z.NEVER
      }
      return value
    }),
})