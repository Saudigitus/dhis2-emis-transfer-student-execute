import { atom } from 'recoil';
import { z } from 'zod';

export const selectedOuSchema = z.object({
    id: z.string(),
    displayName: z.string(),
    selected: z.any()
})

export type SelectedOuSchemaConfig = z.infer<typeof selectedOuSchema>

export const SelectedOuState = atom<SelectedOuSchemaConfig>({
    key: "selected-ou-state",
    default: undefined
})
