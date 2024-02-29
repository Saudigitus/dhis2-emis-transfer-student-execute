import { Paper } from '@material-ui/core'
import React from 'react'
import styles from "./infoPage.module.css"
import useGetSectionTypeLabel from '../../hooks/commons/useGetSectionTypeLabel';
import { getDataStoreKeys } from '../../utils/commons/dataStore/getDataStoreKeys';
import { formatCamelToTitleCase } from '../../utils/commons/formatCamelCaseToWords';

export default function InfoPage() {
    const { sectionName } = useGetSectionTypeLabel();
    const { filterItems } = getDataStoreKeys();
    const filterLabels = filterItems.map(filterItem => formatCamelToTitleCase(filterItem.code)).join(', ');

    return (
        <div className={styles.containerInit}>
            <Paper elevation={1} className={styles.paperInit}>
                <h2>SEMIS - {sectionName} Transfer Execute</h2>
                <span>Follow the instructions to proceed:</span>
                <ul>
                    <li className={styles.paperOtherText}>Select the  Organization unit you want to view data</li>
                    <li className={styles.paperOtherText}>Use global filters({filterLabels} and Academic Year)</li>
                </ul>
            </Paper>
        </div>
    )
}
