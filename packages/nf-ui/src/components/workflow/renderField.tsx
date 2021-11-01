import React from 'react';
import { FieldProperties, CustomFieldName } from '@guyathomas/nf-common/lib/types';
import { FormikProps, useFormikContext } from 'formik';
import { Input } from '../input';
import { AdvancedSelectInput } from '../select-input/components/advanced-select-input';
import { CheckboxRow } from '../checkbox-row';
import { SelectableRow } from '../selectable-row';
import { Text } from '../text';
import { Field } from '../field';
import { FieldProps } from './schemaToFieldProps';
import { SchemaType } from '@guyathomas/nf-common/lib/types/flows/common';

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
          key={props.value}
          isSelected={values[name] === props.value}
          onClick={() => {
            setFieldValue(name, props.value);
          }}
        />
      ))}
    </div>
  );
};

/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/ban-ts-ignore */
// Some non standard components
const customComponentMapJTD: { [key in CustomFieldName]: React.FC } = {
  // @ts-ignore
  advancedSelectInput: (props) => <AdvancedSelectInput {...props} />,
  // @ts-ignore
  selectableRowGroup: (props) => <SelectableRowGroup {...props} />,
};

// All of the default JTD types mapped to the NF component
const componentMapJTD: { [key in FieldProperties['type']]: React.FC<{ onChange: any }> } = {
  float32: (props) => <Input type="number" {...props} onChange={(value) => props.onChange(parseFloat(value))} />,
  float64: (props) => <Input type="number" {...props} onChange={(value) => props.onChange(parseFloat(value))} />,
  int8: (props) => <Input type="number" {...props} onChange={(value) => props.onChange(parseInt(value, 10))} />,
  uint8: (props) => <Input type="number" {...props} onChange={(value) => props.onChange(parseInt(value, 10))} />,
  int16: (props) => <Input type="number" {...props} onChange={(value) => props.onChange(parseInt(value, 10))} />,
  uint16: (props) => <Input type="number" {...props} onChange={(value) => props.onChange(parseInt(value, 10))} />,
  int32: (props) => <Input type="number" {...props} onChange={(value) => props.onChange(parseInt(value, 10))} />,
  uint32: (props) => <Input type="number" {...props} onChange={(value) => props.onChange(parseInt(value, 10))} />,
  string: (props) => <Input type="text" {...props} />,
  timestamp: (props) => <Input type="date" {...props} />,
  boolean: (props) => <CheckboxRow label="" {...props} />,
};
/* eslint-enable react/jsx-props-no-spreading, @typescript-eslint/ban-ts-ignore */

const renderFieldForJTD = (
  { name, properties }: FieldProps,
  { setFieldValue, values, errors }: FormikProps<unknown>,
): React.ReactElement => {
  const { metadata = {} } = properties;
  const Component: React.FC<unknown> = metadata.customField
    ? customComponentMapJTD[metadata.customField]
    : componentMapJTD[properties.type];
  const fieldError = errors[name];
  if (properties.type === 'boolean') {
    return (
      <>
        {fieldError && (
          <Text color="error" size="small" data-testid={`field:error:${name}`}>
            {fieldError}
          </Text>
        )}
        <CheckboxRow
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
};

export const renderFieldMap: Record<
  SchemaType,
  (fieldProps: FieldProps, formikProps: FormikProps<unknown>) => React.ReactElement
> = {
  JTD: renderFieldForJTD,
};
