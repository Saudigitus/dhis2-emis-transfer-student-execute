interface OrgUnitTreeComponentProps {
    onToggle: () => void
}

interface OuFieldProps {
    name: string
}

interface SelectedOuFieldType {
    id: string
    displayName: string
    selected: any
}

interface OuTeiSearchResponseType {
    teiSearchOrganisationUnits: {
        id: string
        displayName: string
    }[]
}

export type { OrgUnitTreeComponentProps, OuFieldProps, SelectedOuFieldType, OuTeiSearchResponseType }