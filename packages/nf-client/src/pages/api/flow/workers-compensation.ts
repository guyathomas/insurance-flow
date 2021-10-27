import { WorkersCompensationSteps, WorkersCompensationStepMapper, ValueOf } from '@guyathomas/nf-common/lib/types';
import type { NextApiRequest, NextApiResponse } from 'next';

const stepMapper: WorkersCompensationStepMapper = {
  contact: {
    pageTitle: 'Who is the primary contact for this policy?',
    pageDescription:
      // eslint-disable-next-line max-len
      'This person will receive all communications from Newfront about this policy. You can change this contact information later. If you’re not sure, just add your contact information.',
    next: WorkersCompensationSteps.COMPANY,
    previous: null,
    schema: {
      properties: {
        fullName: { type: 'string', metadata: { label: 'Full name', order: 1 } },
        role: { type: 'string', metadata: { label: 'Role', order: 2 } },
        phoneNumber: {
          type: 'string',
          metadata: { label: 'Phone number', order: 3, fieldProps: { type: 'tel' } },
        },
      },
    },
  },
  company: {
    pageTitle: 'Tell us about your company',
    next: WorkersCompensationSteps.EMPLOYEES,
    previous: WorkersCompensationSteps.CONTACT,
    schema: {
      properties: {
        companyName: {
          type: 'string',
          metadata: { label: 'Company name', order: 1, placeholder: 'This should exactly match the IRS records' },
        },
        FEIN: {
          type: 'string',
          metadata: { label: 'What is your Federal Employer Identification Number? (FEIN)', order: 2 },
        },
        yearInBusiness: { type: 'int32', metadata: { label: 'Years in business', order: 3 } },
        numberOfLocations: { type: 'int32', metadata: { label: 'Number of locations', order: 4 } },
        statesOfOperation: {
          elements: {
            type: 'string',
          },
          metadata: {
            label: 'In which states do you operate?',
            order: 5,
            customField: 'advancedSelectInput',
            fieldProps: {
              isMulti: true,
              options: [
                {
                  label: 'California',
                  value: 'CA',
                },
                {
                  label: 'Texas',
                  value: 'TX',
                },
              ],
            },
          },
        },
      },
    },
  },
  employees: {
    pageTitle: 'Tell us about your employees',
    next: WorkersCompensationSteps.PAY_PREFERENCES,
    previous: WorkersCompensationSteps.COMPANY,
    schema: {
      properties: {
        clinicName: {
          type: 'string',
          metadata: {
            label: 'What’s the name of the clinic, physician, or ER used for work injuries?',
            order: 1,
          },
        },
        includeMedicalInsurance: {
          type: 'boolean',
          metadata: {
            order: 3,
            label: 'Do you provide group medical insurance?',
          },
        },
        includeRetirementPlan: {
          type: 'boolean',
          metadata: {
            order: 4,
            label: 'Do you offer a retirement or pension plan?',
          },
        },
        includePaidVacation: {
          type: 'boolean',
          metadata: {
            order: 5,
            label: 'Do you give paid vacation?',
          },
        },
        paidVacationDetails: {
          type: 'string',
          metadata: {
            order: 6,
            label: 'Please provide details about the paid vacation',
          },
        },
      },
    },
  },
  'pay-preferences': {
    next: null,
    previous: WorkersCompensationSteps.EMPLOYEES,
    pageTitle: 'How do you want to pay for your policy?',
    schema: {
      properties: {
        paymentRecipient: {
          enum: ['DIRECT', 'NEWFRONT'],
          metadata: {
            order: 1,
            customField: 'selectableRowGroup',
            fieldProps: {
              selectableRowsProps: [
                {
                  title: 'I want to pay Newfront',
                  subtitle:
                    'You’ll pay Newfront instead of paying each insurance company separately. There are no fees.',
                  value: 'NEWFRONT',
                },
                {
                  title: 'I want to pay the insurance company directly',
                  subtitle:
                    'You’ll receive bills from the insurance company and it will be your responsibility to make sure they are paid to keep your coverage.',
                  value: 'DIRECT',
                },
              ],
            },
          },
        },
      },
    },
  },
};

/*
Express always returns a string, or string array type. This is useful for when we are sure that we just want 1 element
*/
const getQueryParam = (param: string | string[]): string => (Array.isArray(param) ? param[0] : param);

export default (req: NextApiRequest, res: NextApiResponse<ValueOf<WorkersCompensationStepMapper>>): void => {
  const currentStep = (getQueryParam(req.query.step) as WorkersCompensationSteps) || WorkersCompensationSteps.CONTACT;
  switch (req.method) {
    case 'GET':
      res.json(stepMapper[currentStep]);
      break;
    case 'POST':
      // TODO: Validate with AJV here
      // TODO save step values here
      res.status(200).end();
      break;
    default:
      res.status(404).end();
  }
};
