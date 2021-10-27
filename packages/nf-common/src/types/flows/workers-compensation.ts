import { Step } from "./common";

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
  stateOfOperation: string[]
}

interface EmployeeFormValues {
  clinicName: string;
  includeMedicalInsurance: boolean;
  includeRetirementPlan: boolean;
  includePaidVacation: boolean;
  paidVacationDetails: string | null;
}

export enum WorkersCompensationSteps {
  CONTACT = "contact",
  COMPANY = "company",
  EMPLOYEES = "employees",
  PAY_PREFERENCES = "pay-preferences",
}

export enum PayPreference {
  NEWFRONT = "NEWFRONT",
  DIRECT = "DIRECT",
}

interface PayPreferencesForm {
  paymentRecipient: PayPreference;
}

export type WorkersCompensationStepMapper = {
  [WorkersCompensationSteps.CONTACT]: Step<ContactFormValues>;
  [WorkersCompensationSteps.COMPANY]: Step<CompanyFormValues>;
  [WorkersCompensationSteps.EMPLOYEES]: Step<EmployeeFormValues>;
  [WorkersCompensationSteps.PAY_PREFERENCES]: Step<PayPreferencesForm>;
};
