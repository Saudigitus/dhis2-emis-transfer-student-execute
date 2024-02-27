import { atom } from 'recoil';
import { RowsSelectionType } from '../types/rows/SelectedRowsTypes';

export const RowSelectionState = atom<RowsSelectionType>({
    key: "get-selection-rows",
    default: {
        isAllRowsSelected: false,
        selectedRows: [],
        rows: []
    }
})
