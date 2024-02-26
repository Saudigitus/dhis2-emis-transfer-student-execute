import { useDataQuery } from '@dhis2/app-runtime'
import { OrganisationUnitTree, CenteredContent, CircularLoader, Help } from "@dhis2/ui"
import React, { useState } from 'react'
import useShowAlerts from '../../hooks/commons/useShowAlert';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useField, type FieldRenderProps } from "react-final-form";
import style from "./OrgUnit.module.css"
import { OuFieldProps, OuTeiSearchResponseType, SelectedOuFieldType } from '../../types/orgUnit/OrgUnitTreeProps';

const ORG_UNIT_QUERY = {
    results: {
        resource: "me",
        params: {
            fields: "teiSearchOrganisationUnits[id,displayName]"
        }
    }
}

export default function OrgUnitTreeField(props: OuFieldProps): React.ReactElement {
    const { hide, show } = useShowAlerts()
    const [selectedOu, setSelectedOu] = useState<SelectedOuFieldType>()
    const { loading, data, error } = useDataQuery<{ results: OuTeiSearchResponseType }>(ORG_UNIT_QUERY, {
        onError(error) {
            show({
                message: `${("Could not get data")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    })
    const { input }: FieldRenderProps<any, HTMLElement> = useField(props.name);

    const onOuChange = (event: SelectedOuFieldType) => {
        setSelectedOu(event)
        input.onChange(event.id)
    }

    if (error != null || data?.results?.teiSearchOrganisationUnits?.length === 0) {
        return <Help error>
            Something went wrong when loading the organisation units!
        </Help>
    }

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader small />
            </CenteredContent>
        )
    }

    return (
        <div className={style.orgUnitCard}>
            <div className={style.cardTree}>
                {((selectedOu?.displayName) != null)
                ?   <div className='d-flex align-items-center'>
                            <span className={style.ouSpan}>
                                {selectedOu?.displayName}
                            </span>
                            <IconButton
                                size="small"
                                onClick={() => { setSelectedOu({} as unknown as SelectedOuFieldType); }}
                                style={{ marginLeft: "auto" }}
                            >
                                <Close fontSize="small" />
                            </IconButton>
                        </div>
                : <OrganisationUnitTree
                    name={data?.results?.teiSearchOrganisationUnits[0]?.displayName}
                    roots={data?.results?.teiSearchOrganisationUnits[0]?.id}
                    singleSelection
                    selected={selectedOu?.selected}
                    onChange={onOuChange}
                />
                }
            </div>
        </div>
    )
}
