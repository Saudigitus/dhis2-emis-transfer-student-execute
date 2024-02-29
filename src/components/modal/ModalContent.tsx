import React, { useState, useEffect, useRef } from "react";
import { ModalActions, Button, ButtonStrip, CircularLoader, CenteredContent, NoticeBox } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import { Form } from "react-final-form";
import { formFields } from "../../utils/constants/formattedForm/formattedForm";
import { useGetFormattedForm } from "../../hooks";
import GroupForm from "../form/GroupForm";
import { useRecoilState } from "recoil";
import { format } from "date-fns";
import { onSubmitClicked } from "../../schema/formOnSubmitClicked";
import { useCreateEvent } from "../../hooks/events/useCreateEvents";
import { RowSelectionState } from "../../schema/tableSelectedRowsSchema";
import { useParams } from "../../hooks/commons/useQueryParams";
import { ModalContentProps } from "../../types/modal/ModalProps";
import { organizeDataValues } from "../../utils/events/organizeDataValues";
import useGetSectionTypeLabel from "../../hooks/commons/useGetSectionTypeLabel";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";

function ModalContentComponent({ setOpen }: ModalContentProps): React.ReactElement {
  const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
  const { formattedFormFields } = useGetFormattedForm();
  const [, setClicked] = useRecoilState<boolean>(onSubmitClicked);
  const [values, setValues] = useState<object>({})
  const [fieldsWitValue, setFieldsWitValues] = useState<any[]>([formattedFormFields])
  const [clickedButton, setClickedButton] = useState<string>("");
  const [selected] = useRecoilState(RowSelectionState);
  const { loadUpdateEvent, updateEvent, data } = useCreateEvent();
  const { transfer } = getDataStoreKeys();
  const { urlParamiters } = useParams();
  const { school: orgUnit } = urlParamiters()
  const { sectionName } = useGetSectionTypeLabel();

  const [initialValues] = useState<object>({
    [transfer?.originSchool]: orgUnit,
    [transfer?.status]: "Pending",
    eventdatestaticform: format(new Date(), "yyyy-MM-dd")
  })

  useEffect(() => {
    if (data !== undefined && data?.status === "OK") {
      if (clickedButton === "saveandcontinue") {
        setOpen(false)
      }
      setClicked(false)
      formRef.current.restart()
    }
  }, [data])

  useEffect(() => { setClicked(false) }, [])

  function onSubmit() {
    const allFields = fieldsWitValue.flat()
      if (allFields.filter((element: any) => (element?.value === undefined && element.required)).length === 0) {
      const events = []
      for (const event of selected.selectedRows) {
        events.push(
          {
            enrollment: event?.enrollment,
          occurredAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
          orgUnit: event?.orgUnit,
          program: event?.program,
          programStage: transfer?.programStage,
          scheduledAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
          status: "ACTIVE",
          trackedEntityInstance: event?.trackedEntity,
          dataValues: organizeDataValues(values)
          })
      }
      void updateEvent({ data: { events } })
    }
  }

  const modalActions = [
    { id: "cancel", type: "button", label: "Cancel", disabled: loadUpdateEvent, onClick: () => { setClickedButton("cancel"); setOpen(false) } },
    { id: "saveandcontinue", type: "submit", label: "Perform transfer", primary: true, disabled: loadUpdateEvent, onClick: () => { setClickedButton("saveandcontinue"); setClicked(true) } }
  ];

  if (formattedFormFields?.length < 1) {
    return (
      <CenteredContent>
        <CircularLoader />
      </CenteredContent>
    )
  }

  function onChange(e: any): void {
    const sections = formattedFormFields;
    for (const [key, value] of Object.entries(e)) {
      for (let i = 0; i < sections?.length; i++) {
        if (sections[i].find((element: any) => element.id === key) !== null && sections[i].find((element: any) => element.id === key) !== undefined) {
          // Sending onChanging form value to variables object
          sections[i].find((element: any) => element.id === key).value = value
        }
      }
    }
    setFieldsWitValues(sections)
    setValues(e)
}

  return (
    <WithPadding>
      <React.Fragment>
        < NoticeBox title={`WARNING! ${selected.selectedRows.length} rows will be affected`} warning>
        </NoticeBox>
        <br />
      </React.Fragment>
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit, values, form, pristine }) => {
          formRef.current = form;
          return <form
            onSubmit={handleSubmit}
            onChange={onChange(values)}
          >
            {
              formFields(formattedFormFields, sectionName).map((field: any, index: number) => (
                <GroupForm
                  name={field.section}
                  description={field.description}
                  key={index}
                  fields={field.fields}
                  disabled={false}
                />
              ))
            }
            <br />
            <ModalActions>
              <ButtonStrip end>
                {modalActions.map((action, i) => (
                  <Button
                    key={i}
                    loading={((Boolean(loadUpdateEvent)) && action.id === clickedButton)}
                    {...action}
                    disabled={pristine || action.disabled}
                  >
                    {action.label}
                  </Button>
                ))}
              </ButtonStrip>
            </ModalActions>
          </form>
        }}
      </Form>
    </WithPadding >
  )
}

export default ModalContentComponent;
