import React from 'react';
import { useRouter } from 'next/router';
import { SomeJTDSchemaType, Step } from '@guyathomas/nf-common/lib/types';
import { Form, Formik } from 'formik';
import Ajv from 'ajv/dist/jtd';
import { Title } from '../title';
import { Button } from '../button';
import { useStepData } from './useStepData';
import { schemaToFieldPropsMap } from './schemaToFieldProps';
import { renderFieldMap } from './renderField';

const ajv = new Ajv({
  allErrors: true,
  strictSchema: false,
});

interface WorkflowProps {
  schemaUrl: string;
}

export const Workflow: React.FC<WorkflowProps> = ({ schemaUrl }) => {
  const router = useRouter();
  const { data, loading, error } = useStepData<Step<SomeJTDSchemaType>>(schemaUrl);

  const allFieldProps = React.useMemo(
    () => data?.schemaType && schemaToFieldPropsMap[data.schemaType]?.(data?.schema),
    [data?.schema, data?.schemaType],
  );

  if (loading || !data?.pageTitle) return <div>Loading</div>;
  if (error) {
    return (
      <span role="img" aria-label="Error loading page">
        Error Loading Page🥲
      </span>
    );
  }

  return (
    <div>
      <Title>{data.pageTitle}</Title>
      <Title as="h3" size={17} weight={400}>
        {data.pageDescription}
      </Title>
      <Formik
        onSubmit={(values) => {
          console.log('Submitting', values);
          if (data.next) {
            // Ideally this part would work as follows
            // 1. On submit, we do a POST to the route for this step.
            // That request will run server validation, and then return data.next which we then use to nav to the next route.
            // This allows us to determine on the server where the next path will lead, and can depend on the current form state.
            router.push({ query: { step: data.next } }, undefined, { shallow: true });
          }
        }}
        validateOnChange={false}
        validateOnBlur
        initialValues={data.initialValues || {}}
        validate={(values) => {
          const validate = ajv.compile(data.schema as any);
          const valid = validate(values);
          return valid
            ? {}
            : validate.errors.reduce((errorObject, validationError) => {
                const fieldName = validationError.schemaPath.replace('/properties/', '');
                return {
                  ...errorObject,
                  [fieldName]: validationError.message,
                };
              }, {});
        }}
      >
        {(formikProps) => (
          <Form>
            {allFieldProps.map((fieldProps) => {
              const res = renderFieldMap[data.schemaType](fieldProps, formikProps);
              console.log('zzz', renderFieldMap[data.schemaType]);
              return res;
            })}
            {data.previous && (
              <Button
                onClick={() => {
                  router.push({ query: { step: data.previous } }, undefined, { shallow: true });
                }}
              >
                Back
              </Button>
            )}
            <Button type="submit">{data.next ? 'Next' : 'Finish'}</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
