import React from 'react';
import { Stack } from '../stack';
import { Text } from '../text';
import { Flexbox } from '../flexbox';
import { Padding } from '../padding';
import { Tooltip } from '../tooltip';
import { MiniIconQuestionMark } from '../mini-icons';

interface Props {
  fieldId: string;
  label: string;
  hint?: string;
  error?: string | false;
  children: React.ReactNode;
  subText?: string;
  tooltip?: string;
}

export function Field(props: Props): JSX.Element {
  const { children, label, hint, error, fieldId, subText, tooltip } = props;

  return (
    <div data-testid={fieldId}>
      <Stack gap={8} direction="vertical" key={label}>
        <label htmlFor={fieldId}>
          <Flexbox alignItems="center">
            <Text weight={600} color="dark">
              {label}
            </Text>
            {subText && (
              <Padding left={4}>
                <Text weight={300} color="dark">
                  {subText}
                </Text>
              </Padding>
            )}
            {tooltip && (
              <Padding left={4}>
                <Tooltip text={tooltip}>
                  <MiniIconQuestionMark />
                </Tooltip>
              </Padding>
            )}
          </Flexbox>
        </label>
        {children}
        {error ? (
          <Text color="error" size="small" data-testid={`field:error:${fieldId}`}>
            {error}
          </Text>
        ) : (
          hint && <Text size="small">{hint}</Text>
        )}
      </Stack>
    </div>
  );
}
