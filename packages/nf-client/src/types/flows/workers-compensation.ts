import { Step, SomeJTDSchemaTypeStep } from './common';

interface ContactFormValues {
  fullName: string;
  role: string;
  phoneNumber: string;
}

interface CompanyFormValues {
  companyName: string;
  FEIN: string;
  yearInBusiness: number;
  numberOfLocations: number;
  // stateOfOperation: string[]
}

export enum WorkersCompensationSteps {
  CONTACT = 'contact',
  COMPANY = 'company',
  EMPLOYEES = 'employees',
  PAY_PREFERENCES = 'pay-preferences',
  COMPLETE = 'complete',
}

type WorkersCompensationStepMapperStrict = {
  [WorkersCompensationSteps.CONTACT]: Step<ContactFormValues>;
  [WorkersCompensationSteps.COMPANY]: Step<CompanyFormValues>;
};

type WorkersCompensationStepMapperGeneric = { [key in WorkersCompensationSteps]: SomeJTDSchemaTypeStep };

export type WorkersCompensationStepMapper = WorkersCompensationStepMapperStrict | WorkersCompensationStepMapperGeneric;
