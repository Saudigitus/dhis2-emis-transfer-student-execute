import { type OptionSet } from "../../../types/generated"
import { defaultProps } from "../../../types/utils/FormatRowsDataProps"

export function getDisplayName({ attribute, value, headers }: defaultProps): string {
    /* for (let i = 0; i < headers.length; i++) {
        if (attribute === headers[i].id && typeof headers[i].optionSets !== 'undefined') {
            for (const op of headers[i].optionSets || []) {
                if (op.code === value) return op.displayName
            }
        }
    } */
    return value
}
