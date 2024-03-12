import React, { useEffect } from 'react'
import style from "./MainHeader.module.css"
import { headBarData } from '../../../utils/constants/headBar/headBarData'
import HeaderItem from './HeaderItem'
import { useParams } from '../../../hooks/commons/useQueryParams'
import { getSelectedKey } from '../../../utils/commons/dataStore/getSelectedKey'
import { ProgramConfig } from '../../../types/programConfig/ProgramConfig'
import { programStageDataElements } from '../../../types/programStageConfig/ProgramStageConfig'
import { useRecoilValue } from 'recoil'
import { ProgramConfigState } from '../../../schema/programSchema'
import { initializeRulesEngine } from '../../../hooks/programRules/rules-engine/InitializeRulesEngine'

export default function MainHeader(): React.ReactElement {
    const { urlParamiters } = useParams();
    const selectedOptions = urlParamiters();
    const { getDataStoreData } = getSelectedKey();
    const programConfig: ProgramConfig = useRecoilValue(ProgramConfigState)
    const programStageDataElements: programStageDataElements[] | any = programConfig?.programStages?.find((programStage: any) => programStage.id === getDataStoreData.registration.programStage)?.programStageDataElements
    const { initialize } = initializeRulesEngine()

    useEffect(() => {
        initialize()
    }, [])

    return (
        <nav className={style.MainHeaderContainer}>
            {headBarData(selectedOptions, getDataStoreData, programStageDataElements).map(headerItem => (
                <HeaderItem key={headerItem.id} id={headerItem.id} dataElementId={headerItem.dataElementId} component={headerItem.component} placeholder={headerItem.placeholder} label={headerItem.label} value={headerItem.value} selected={headerItem.selected} />
            ))}
        </nav>
    )
}
