' use server'

import { actionClient } from "@/lib/safe-action"
import { formSchema } from "./schema"


const upsertCreditCardExpense = actionClient.schema(formSchema)