import React from 'react';
import { useRouter } from 'next/router';
import { SomeJTDSchemaType, Step } from '@guyathomas/nf-common/lib/types';
import { Form, Formik } from 'formik';
import Ajv from 'ajv/dist/jtd';
import { Field } from '../field';
import { Title } from '../title';
import { Button } from '../button';
import { CheckboxRow } from '../checkbox-row';
import { Text } from '../text';
import { useStepData } from './useStepData';
import { transformJTDSchema } from './schemaTransformer';
import { componentMap, customComponentMap } from './componentMappers';

const ajv = new Ajv({
  keywords: ['label', 'order', 'customField', 'fieldProps'],
  allErrors: true,
});

interface WorkflowProps {
  schemaUrl: string;
}

export const Workflow: React.FC<WorkflowProps> = ({ schemaUrl }) => {
  const router = useRouter();
  const { data, loading, error } = useStepData<Step<SomeJTDSchemaType>>(schemaUrl);

  const fieldProps = React.useMemo(() => transformJTDSchema(data?.schema), [data?.schema]);

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
            router.push({ query: { step: data.next } }, undefined, { shallow: true });
          }
        }}
        validateOnChange={false}
        validateOnBlur
        initialValues={{}}
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
        {({ values, setFieldValue, errors }) => (
          <Form>
            {fieldProps.map(({ name, properties }) => {
              const { metadata = {} } = properties;
              const Component = metadata.customField
                ? customComponentMap[metadata.customField]
                : componentMap[properties.type];
              const fieldError = errors[name];
              if (!Object.hasOwnProperty.call(values, name)) {
                // Initialize the values to false when they don't exist
                setFieldValue(name, false);
              }
              if (properties.type === 'boolean') {
                return (
                  <>
                    {fieldError && (
                      <Text color="error" size="small" data-testid={`field:error:${name}`}>
                        {error}
                      </Text>
                    )}
                    <CheckboxRow
                      fieldId={name}
                      name={name}
                      label={metadata.label}
                      isActive={values[name] || null}
                      onClick={(value) => {
                        setFieldValue(name, value);
                      }}
                      /* eslint-disable-next-line */
                      {...(metadata.fieldProps || {})}
                    />
                  </>
                );
              }
              return (
                <Field fieldId={name} label={metadata.label} error={fieldError}>
                  <Component
                    fieldId={name}
                    name={name}
                    value={values[name]}
                    onChange={(value) => {
                      setFieldValue(name, value);
                    }}
                    /* eslint-disable-next-line */
                    {...(metadata.fieldProps || {})}
                  />
                </Field>
              );
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
