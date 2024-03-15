import { RowsSelectionType } from "../../types/rows/SelectedRowsTypes";

export const checkIsRowSelected = (rawRowData: any, selected: RowsSelectionType) => {
    const newArray = [...selected.selectedRows];
    const existingIndex = newArray.findIndex(item => item.event === rawRowData.event);

    if (existingIndex !== -1) {
        newArray.splice(existingIndex, 1); // Remover o objeto existente
    } else {
        newArray.push(rawRowData); // Adicionar o novo objeto
    }
    return newArray;
}
