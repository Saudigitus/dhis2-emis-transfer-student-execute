import { MergeArrayObjectsProps } from "../../types/utils/MergeArrayObjectsProps";

export const mergeArrayObjects = ({ array, key }: MergeArrayObjectsProps) => {
    const mergedRows = array.filter((obj, index) => {
        return index === array.findIndex(o => obj[key] === o[key]);
    })

    return mergedRows;
}
