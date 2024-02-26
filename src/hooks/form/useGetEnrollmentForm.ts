import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { formatResponseEvents } from '../../utils/events/formatResponseEvents';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { ProgramStageConfig } from '../../types/programStageConfig/ProgramStageConfig';

export default function useGetEnrollmentForm() {
    const [enrollmentsData, setEnrollmentsData] = useState<any[]>([])
    const getProgram = useRecoilValue(ProgramConfigState);
    const { getDataStoreData } = getSelectedKey()

    const buildForm = () => {
        if (Object.keys(getDataStoreData)?.length !== 0 && getProgram !== undefined) {
            const { transfer: { programStage, originSchool, status } } = getDataStoreData
            const { programStages } = getProgram

            const transferProgramStage = programStages.find((elemnt: ProgramStageConfig) => elemnt.id === programStage) as unknown as ProgramStageConfig
            
            setEnrollmentsData([formatResponseEvents(transferProgramStage).filter(x => x.id !== status && x.id !== originSchool)])
        }
    }
    useEffect(() => {
        buildForm()
    }, [])

    return { enrollmentsData }
}
