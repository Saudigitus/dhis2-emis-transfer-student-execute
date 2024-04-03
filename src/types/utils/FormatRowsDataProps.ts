import { attributesProps } from "../api/WithRegistrationProps"
import { dataValuesProps } from "../api/WithoutRegistrationProps"
import { ProgramConfig } from "../programConfig/ProgramConfig"

interface FormatResponseRowsProps {
    eventsInstances: {
        event: string
        trackedEntity: string
        dataValues: dataValuesProps[]
    }[]
    teiInstances: {
        trackedEntity: string
        attributes: attributesProps[]
        enrollments: {
            enrollment: string
            orgUnit: string
            program: string
        }[]
    }[]
}

type RowsDataProps = Record<string, string | number | boolean | any>;

interface defaultProps {
    metaData: string
    program: ProgramConfig
    value: string
}
export type { FormatResponseRowsProps, RowsDataProps, defaultProps }
