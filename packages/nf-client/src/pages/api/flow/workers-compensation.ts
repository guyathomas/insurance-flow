import { WorkersCompensationSteps, WorkersCompensationStepMapper } from 'types/flows/workers-compensation';
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
        fullName: { type: 'string', metadata: { label: 'Full name' } },
        phoneNumber: { type: 'string', metadata: { label: 'Role' } },
        role: { type: 'string', metadata: { label: 'Phone number' } },
      },
    },
  },
  company: {
    pageTitle: 'Tell us about your company',
    next: WorkersCompensationSteps.EMPLOYEES,
    previous: WorkersCompensationSteps.CONTACT,
    schema: {
      properties: {
        companyName: { type: 'string', metadata: { label: 'Company name' } },
        FEIN: { type: 'string', metadata: { label: 'What is your Federal Employer Identification Number? (FEIN)' } },
        yearInBusiness: { type: 'int32', metadata: { label: 'Years in business' } },
        numberOfLocations: { type: 'int32', metadata: { label: 'Number of locations' } },
        // statesOfOperation: { type: 'int32', metadata: { label: 'Number of locations' } },
      },
    },
  },
};
type ValueOf<T> = T[keyof T];

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
