import React from 'react';
import { useRouter } from 'next/router';
import { SomeJTDSchemaType, Step, FieldProperties, CustomFieldName } from '@guyathomas/nf-common/lib/types';
import { Form, Formik, useFormikContext } from 'formik';
import Ajv from 'ajv/dist/jtd';
import { Input } from '../input';
import { Field } from '../field';
import sortBy from 'lodash/sortBy';
import { Title } from '../title';
import { Button } from '../button';
import { useAxios, Request } from '../../hooks/axios';
import { AdvancedSelectInput } from '../select-input/components/advanced-select-input';
import { CheckboxRow } from '../checkbox-row';
import { Text } from '../text';
import { SelectableRow } from '../selectable-row';

const ajv = new Ajv({
  keywords: ['label', 'order', 'customField', 'fieldProps'],
  allErrors: true,
});

function useStepData<T>(url: string): Request<T> {
  const router = useRouter();
  const step = router.query.step as string;
  const options = {
    url,
    params: {
      step,
    },
  };
  const [fetch, request] = useAxios<T>(options);
  React.useEffect(() => {
    fetch(options);
  }, [step]);
  return request;
}

interface WorkflowProps {
  schemaUrl: string;
}

interface FieldProps {
  name: string;
  properties: FieldProperties;
}
const makeFieldProperties = (schemaProperties = {}): FieldProps[] =>
  Object.entries(schemaProperties).map(([name, properties]: [string, FieldProps['properties']]) => ({
    name,
    properties,
  }));

const getOrderedFieldProps = (schema?: SomeJTDSchemaType): FieldProps[] => {
  if (!schema) return [];
  if ('properties' in schema || 'optionalProperties' in schema) {
    return sortBy(
      [...makeFieldProperties(schema.properties), ...makeFieldProperties(schema.additionalProperties)],
      'properties.metadata.order',
    );
  }
  return [];
};

interface GenericFieldProps {
  fieldId: string;
  name: string;
  [key: string]: any;
}

interface SelectableRowGroup {
  selectableRowsProps: (Parameters<typeof SelectableRow>[0] & { value: string })[];
  name: string;
}

const SelectableRowGroup: React.FC<SelectableRowGroup> = ({ selectableRowsProps, name }) => {
  const { setFieldValue, values } = useFormikContext();
  return (
    <div>
      {selectableRowsProps.map((props) => (
        <SelectableRow
          // eslint-disable-next-line
          {...props}
          isSelected={values[name] === props.value}
          onClick={() => {
            setFieldValue(name, props.value);
          }}
        />
      ))}
    </div>
  );
};

const customComponentMap: { [key in CustomFieldName]: React.FC<GenericFieldProps> } = {
  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line
  advancedSelectInput: (props) => <AdvancedSelectInput {...props} />,
  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line
  selectableRowGroup: (props) => <SelectableRowGroup {...props} />,
};
/* eslint-disable react/jsx-props-no-spreading */
const componentMap: { [key in FieldProperties['type']]: React.FC<GenericFieldProps> } = {
  float32: (props) => <Input type="number" {...props} />,
  float64: (props) => <Input type="number" {...props} />,
  int8: (props) => <Input type="number" {...props} />,
  uint8: (props) => <Input type="number" {...props} />,
  int16: (props) => <Input type="number" {...props} />,
  uint16: (props) => <Input type="number" {...props} />,
  int32: (props) => <Input type="number" {...props} />,
  uint32: (props) => <Input type="number" {...props} />,
  string: (props) => <Input type="text" {...props} />,
  timestamp: (props) => <Input type="date" {...props} />,
  boolean: (props) => <CheckboxRow label="" {...props} />,
};
/* eslint-enable react/jsx-props-no-spreading */

export const Workflow: React.FC<WorkflowProps> = ({ schemaUrl }) => {
  const router = useRouter();
  const { data, loading, error } = useStepData<Step<SomeJTDSchemaType>>(schemaUrl);

  const fieldProps = React.useMemo(() => getOrderedFieldProps(data?.schema), [data?.schema]);

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
