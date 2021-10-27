import React from 'react';
import { FieldProperties, CustomFieldName } from '@guyathomas/nf-common/lib/types';
import { useFormikContext } from 'formik';
import { Input } from '../input';
import { AdvancedSelectInput } from '../select-input/components/advanced-select-input';
import { CheckboxRow } from '../checkbox-row';
import { SelectableRow } from '../selectable-row';

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

/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/ban-ts-ignore */
export const customComponentMap: { [key in CustomFieldName]: React.FC } = {
  // @ts-ignore
  advancedSelectInput: (props) => <AdvancedSelectInput {...props} />,
  // @ts-ignore
  selectableRowGroup: (props) => <SelectableRowGroup {...props} />,
};

export const componentMap: { [key in FieldProperties['type']]: React.FC<{ onChange: any }> } = {
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
