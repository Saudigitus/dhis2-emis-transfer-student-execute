import { format } from "date-fns";
import { VariablesTypes } from "../../../types/variables/AttributeColumns";
import { FormSectionProps } from "../../../types/form/FormSectionProps";

const staticForm = () => {
  return {
    enrollmentDate: {
      required: true,
      name: "eventdatestaticform",
      labelName: "Enrollment date",
      valueType: "DATE",
      options: undefined,
      disabled: false,
      pattern: "",
      visible: true,
      description: "Enrollment date",
      searchable: false,
      error: false,
      programStage: "",
      content: "",
      id: "eventdatestaticform",
      displayName: "Enrollment date",
      header: "Enrollment date",
      type: VariablesTypes.DataElement,
      value: format(new Date(), "yyyy-MM-dd")
    }
  }
}

function formFields(enrollmentsData: any[]): FormSectionProps[] {
  const [transferForm] = enrollmentsData;

  return [
    {
      section: "Transfer student",
      description: "Select the school you want to transfer the student(s) to",
      fields: [
        ...transferForm
      ]
    }
  ];
}

export { formFields, staticForm };
