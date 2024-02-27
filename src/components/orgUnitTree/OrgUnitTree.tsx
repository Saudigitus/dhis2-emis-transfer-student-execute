import { useDataQuery } from '@dhis2/app-runtime'
import { OrganisationUnitTree, CenteredContent, CircularLoader, Help } from "@dhis2/ui"
import React, { useState } from 'react'
import { useParams } from '../../hooks/commons/useQueryParams';
import useShowAlerts from '../../hooks/commons/useShowAlert';
import { OrgUnitTreeComponentProps, OuResponseType, SelectedOuType } from '../../types/orgUnit/OrgUnitTreeProps';

const ORG_UNIT_QUERY = {
    results: {
        resource: "me",
        params: {
            fields: "organisationUnits[id,displayName]"
        }
    }
}

export default function OrgUnitTree(props: OrgUnitTreeComponentProps): React.ReactElement {
    const  { onToggle } = props;
    const { hide, show } = useShowAlerts()
    const [selectedOu, setSelectedOu] = useState<SelectedOuType>()
    const { add } = useParams();
    const { loading, data, error } = useDataQuery<{ results: OuResponseType }>(ORG_UNIT_QUERY, {
        onError(error) {
            show({
                message: `${("Could not get data")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    })

    const onOuChange = (event: SelectedOuType) => {
        add("school", event?.id);
        add("schoolName", event?.displayName);
        setSelectedOu(event);
        onToggle()
    }

    if (error != null) {
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
        <OrganisationUnitTree
            name={data?.results.organisationUnits[0].displayName}
            roots={data?.results.organisationUnits[0].id}
            singleSelection
            selected={selectedOu?.selected}
            onChange={onOuChange}
        />
    )
}
