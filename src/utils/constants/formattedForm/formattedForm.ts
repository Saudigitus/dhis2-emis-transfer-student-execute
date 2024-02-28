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

function formFields(formattedFormFields: any[], sectionName: string): FormSectionProps[] {
  const [transferForm] = formattedFormFields;

  return [
    {
      section: `Transfer ${sectionName}`,
      description: `Select the school you want to transfer the ${sectionName} to`,
      fields: [
        ...transferForm
      ]
    }
  ];
}

export { formFields, staticForm };
