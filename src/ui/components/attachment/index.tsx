import React, { useState } from 'react';
import stripExtension from 'strip-extension';
import fileExtension from 'file-extension';
import { Padding } from '../padding';
import { Flexbox, FlexCell } from '../flexbox';
import { Stack } from '../stack';
import { Input } from '../input';
import { IconButton } from '../icon-button';
import { SelectInput } from '../select-input';
import { Option } from '../select-input/types';

interface Props {
  fileName: string;
  onRemove: () => unknown;
  onUpdate: (oldName: string, newName: string, option?: string) => unknown;
  onOptionUpdate?: (selectedOption: string) => unknown;
  type: string;
  options?: Option[];
  defaultOption?: string;
}

/**
 * File line item with an editable name and type
 */
export function Attachment(props: Props): JSX.Element {
  const { fileName, onRemove, onUpdate, options, defaultOption } = props;
  const fileType = fileExtension(fileName);

  const [attmName, setAttmName] = useState(stripExtension(fileName));
  const [selectedOption, setSelectedOption] = useState(options ? options[0].value : '');

  /**
   * handleChange
   * on name/option change, save to state and pass to onUpdate
   */
  const handleChange = (newName?: string, newOption?: string): void => {
    const name = newName || attmName;

    // do we have option categories?
    // if so, do we have the latest selected option?
    let option;
    if (options) {
      if (newOption) {
        option = newOption;
      } else {
        option = selectedOption;
      }
    }

    setAttmName(name);
    onUpdate(fileName, `${name}.${fileType}`, option);
  };

  /**
   * handleOptionChange
   * Set a selected option and pass it to out handleChange hook
   */
  const handleOptionChange = (newOption: string): void => {
    setSelectedOption(newOption);
    handleChange(undefined, newOption);
  };

  return (
    <Padding size={12}>
      <Flexbox alignItems="center">
        <FlexCell flex={4}>
          <Stack direction="vertical" gap={16}>
            <Input
              appendText={fileType}
              type="text"
              name="filename"
              defaultValue={attmName}
              disabled={false}
              onChange={(val: string) => handleChange(stripExtension(val))}
            />
          </Stack>
        </FlexCell>
        {options ? (
          <FlexCell flex={2}>
            <Padding left={12}>
              <SelectInput onChange={handleOptionChange} options={options} defaultValue={defaultOption} />
            </Padding>
          </FlexCell>
        ) : null}
        <FlexCell>
          <Padding left={12}>
            <Flexbox alignItems="center">
              <IconButton
                type="close"
                onClick={(e) => {
                  e.preventDefault();
                  onRemove();
                }}
              />
            </Flexbox>
          </Padding>
        </FlexCell>
      </Flexbox>
    </Padding>
  );
}
