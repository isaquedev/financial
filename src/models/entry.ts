import { Entry } from "@prisma/client"
import { Validation } from "@validations/validator"

interface EntryChangeValidationFields extends Omit<Entry, "id" | "userId" | "createdAt" | "updatedAt"> {}

export type EntryChangeValidation = Validation<EntryChangeValidationFields>

interface IEntryModel {
  changeValidation: EntryChangeValidation
}

export const entryValidations: IEntryModel = {
  changeValidation: {
    name: { name: "Nome", type: "string", required: true, min: 3, max: 255 },
    date: { name: "Data", type: "date", required: true },
    done: { name: "Pago", type: "boolean", required: true },
    walletId: { name: "Carteira", type: "string", required: true },
    type: { name: "Tipo", type: "enum", required: true, enum: ["income", "expense", "transfer"] },
    value: { name: "Valor", type: "integer", required: true, min: 1 },
  }
}
