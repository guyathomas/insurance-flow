/* eslint max-len: 0 */
import React from 'react';
import { Box } from '../box';
import { Padding } from '../padding';
import { Flexbox, FlexCell } from '../flexbox';
import { Stack } from '../stack';
import { Input } from '../input';
import { IconButton } from '../icon-button';
import { colors } from '../../theme';
import { TextLink } from '../text-link';

function PDFIcon(): JSX.Element {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <path d="M3 29V31C3 31.6 3.4 32 4 32H28C28.6 32 29 31.6 29 31V29H3Z" fill={colors.gray_d} />
      <path d="M22 1.59998V6.99998H27.4L22 1.59998Z" fill={colors.gray_d} />
      <path
        d="M10.9 18.5H10.5V19.8H10.8C11 19.8 11.2 19.7 11.4 19.6C11.6 19.5 11.6 19.3 11.6 19.1C11.6 18.7 11.4 18.5 10.9 18.5Z"
        fill={colors.gray_d}
      />
      <path
        d="M16 18.5H15.6V21.7H15.9C16.4 21.7 16.7 21.6 16.9 21.3C17.1 21 17.2 20.6 17.2 20.1C17.2 19.6 17.1 19.2 16.9 18.9C16.7 18.6 16.5 18.5 16 18.5Z"
        fill={colors.gray_d}
      />
      <path
        d="M31 13H29V9H21C20.4 9 20 8.6 20 8V0H4C3.4 0 3 0.4 3 1V13H1C0.4 13 0 13.4 0 14V26C0 26.6 0.4 27 1 27H31C31.6 27 32 26.6 32 26V14C32 13.4 31.6 13 31 13ZM12.6 20.6C12.2 20.9 11.7 21.1 11 21.1H10.6V23H9V17.3H11C11.7 17.3 12.3 17.5 12.6 17.8C12.9 18.1 13.1 18.6 13.1 19.1C13.1 19.7 13 20.2 12.6 20.6ZM18.1 22.2C17.6 22.7 16.8 23 15.9 23H14.1V17.3H16.1C17 17.3 17.7 17.5 18.2 18C18.7 18.5 18.9 19.1 18.9 20C18.9 21 18.6 21.7 18.1 22.2ZM23.3 18.5H21.4V19.6H23.1V20.8H21.4V23H19.9V17.3H23.3V18.5Z"
        fill={colors.gray_d}
      />
    </svg>
  );
}

function GenericIcon(): JSX.Element {
  return (
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <g transform="translate(0, 0)">
        <polygon data-color="color-2" points="22 1 22 8 29 8 22 1" fill={colors.gray_d} />
        <path d="M20,10V0H3A1,1,0,0,0,2,1V31a1,1,0,0,0,1,1H29a1,1,0,0,0,1-1V10Z" fill={colors.gray_d} />
      </g>
    </svg>
  );
}

interface Props {
  fileName: string;
  onRemove: () => unknown;
  type: 'pdf';
}

function fileExtension(fileName: string): string {
  const ext = (/[^./\\]*$/.exec(fileName) || [''])[0];
  return ext.toLowerCase();
}

type FileType = 'pdf' | string;
type FileTypeMapping = {
  [key in FileType]: () => JSX.Element;
};

const FILE_TYPE_ICONS: FileTypeMapping = {
  pdf: PDFIcon,
};

function createS3Url(fileName: string): string {
  const encodedFileName = encodeURIComponent(fileName);
  return `/conversion/viewS3File?fileName=${encodedFileName}`;
}

export function UploadedFile(props: Props): JSX.Element {
  const { fileName, onRemove } = props;
  const fileType = fileExtension(fileName);
  const Icon = FILE_TYPE_ICONS[fileType] || GenericIcon;

  const href = createS3Url(fileName);

  return (
    <Box border={1} boxShadow="card" borderRadius={3}>
      <Padding size={24}>
        <Flexbox alignItems="flex-start">
          <FlexCell flex="none">
            <Padding right={24} top={4}>
              <Icon />
            </Padding>
          </FlexCell>
          <FlexCell flex={1}>
            <Stack direction="vertical" gap={16}>
              <Input type="text" name="filename" defaultValue={fileName} />
              <Flexbox justifyContent="space-between" alignItems="center">
                <FlexCell>
                  <TextLink href={href} target="_blank">
                    Open file in new tab
                  </TextLink>
                </FlexCell>
                <FlexCell>
                  <IconButton
                    type="remove"
                    onClick={(e) => {
                      e.preventDefault();
                      onRemove();
                    }}
                  />
                </FlexCell>
              </Flexbox>
            </Stack>
          </FlexCell>
        </Flexbox>
      </Padding>
    </Box>
  );
}
