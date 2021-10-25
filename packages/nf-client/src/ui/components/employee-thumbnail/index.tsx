import React from 'react';
import ReactImageFallback from 'react-image-fallback';
import styled from 'styled-components';

export interface EmployeeThumbnailProps {
  imageUrl?: string;
  sizeInPixels: number;
  variant?: 'round' | 'squircle';
}

/**
 * React fallback image will accept an SVG as a fallback, however it wont naturally apply the image styling,
 * hence why we need a StyledSVG component
 * https://www.npmjs.com/package/react-image-fallback#fallbackimage
= */
const MissingProfile = ({ variant, size }): JSX.Element => (
  <StyledSVG variant={variant} width={size} height={size} viewBox="0 0 300 300" fill="none">
    <rect width="300" height="300" fill="url(#pattern0)" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0" transform="scale(0.00333333)" />
      </pattern>
      <image
        id="image0"
        width="300"
        height="300"
        // eslint-disable-next-line max-len
        xlinkHref="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAABLKADAAQAAAABAAABLAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgBLAEsAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwQDAwMEBQQEBAQFBwUFBQUFBwgHBwcHBwcICAgICAgICAoKCgoKCgsLCwsLDQ0NDQ0NDQ0NDf/bAEMBAgICAwMDBgMDBg0JBwkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDf/dAAQAE//aAAwDAQACEQMRAD8A/diiiitDMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q/diiiitDMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//R/diiiitDMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S/diiiitDMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//T/diiiitDMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//U/diiiitDMKKKKACiiigAooooAKKKKACiiq15d29hbvd3b+XEmNzYJxkgDgAnqaALNFc3/wAJd4e/5+//ACHJ/wDE1t2d3b39ul3aP5kT52tgjOCQeCAeooAs0ViXniLRrC4e0u7jy5UxuXY5xkAjkKR0NFn4i0a/uEtLS48yV87V2OM4BJ5KgdBRcLG3RXK+NvG3hj4c+GL3xl4yvf7P0fT/ACvtNz5Us+zz5UhT5IUkkOZHUcKcZyeMkfP/APw21+zF/wBDn/5S9S/+RK9XA5FmWNpurg8POpFO14wlJX7XSeuq08zgxWaYLDT9nia0YPe0pJO3fVn1VRXK+CfG3hj4jeGLLxl4Nvf7Q0fUPN+zXPlSwb/IleF/kmSOQYkRhyozjI4wT5V42/aj+BPw58T3vg3xl4m/s/WNP8r7TbfYL6fZ58STJ88NvJGcxup4Y4zg85Azw+UY6vXlhaFGcqkb3iotyVnZ3SV1Z6O+z0LrZhhaVKNerVjGDtZtpJ31VnezutUe/wBFeAeCf2o/gT8RvE9l4N8G+Jv7Q1jUPN+zW32C+g3+RE8z/PNbxxjEaMeWGcYHOAfVfG3jbwx8OfDF74y8ZXv9n6Pp/lfabnypZ9nnypCnyQpJIcyOo4U4zk8ZIMRlGOoV44WvRnGpK1ouLUnd2Vk1d3eitu9Ao5hhatKVelVjKCvdpppW1d3eystWdVRXyr/w21+zF/0Of/lL1L/5Er6A8E+NvDHxG8MWXjLwbe/2ho+oeb9mufKlg3+RK8L/ACTJHIMSIw5UZxkcYJ0x2RZlgqaq4zDzpxbteUJRV+12lro9PIjC5pgsTP2eGrRm97Rkm7d9GdVRXgHj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t0tLRPLiTO1ck4ySTyST1NSkU2eOeLv+Rhu/+2f/AKLWjwj/AMjDaf8AbT/0W1eo3nh3Rr+4e7u7fzJXxube4zgADgMB0FFn4d0awuEu7S38uVM7W3ucZBB4LEdDRbUL6G3RRRVEhRRRQAUUUUAFFFFABRRRQAUUUUAf/9P92KKKK0MwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArE8R3dxYaNcXdo/lyps2tgHGXUHggjoa26xPEdpcX+jXFpaJ5kr7Nq5Azh1J5JA6Chgjy7/hLvEP/P3/AOQ4/wD4mvUfDl3cX+jW93dv5kr79zYAzh2A4AA6CvLv+ER8Q/8APp/5Ej/+Kr1Hw5aXFho1vaXaeXKm/cuQcZdiOQSOhqUUzifEfiLWbDWbi0tLjy4k2bV2IcZRSeSpPU0eHPEWs3+s29pd3HmRPv3LsQZwjEchQeoo8R+HdZv9ZuLu0t/MifZtbegzhFB4LA9RR4c8O6zYazb3d3b+XEm/c29DjKMBwGJ6mjW4aWPUaKKKokKKKKACiiigAooooAKKKKACiiigD//U/diiiitDMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//V/diiiitDMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//W/diiiitDMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X/diiiitDMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q/diiiitDMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//R/diiiitDMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Z"
      />
    </defs>
  </StyledSVG>
);

// https://medium.com/@zubryjs/squircles-bringing-ios-7s-solution-to-rounded-rectangles-to-css-9fc35779aa65
export function squircleClipPath(radius: number): string {
  return new Array(360)
    .fill(0)
    .map((_x, i) => i)
    .map((deg) => (deg * Math.PI) / 180)
    .map((theta: number) => ({
      x: Math.abs(Math.cos(theta)) ** (2 / radius) * 50 * Math.sign(Math.cos(theta)) + 50,
      y: Math.abs(Math.sin(theta)) ** (2 / radius) * 50 * Math.sign(Math.sin(theta)) + 50,
    }))
    .map(({ x, y }) => ({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 })) // Round to the ones place
    .map(({ x, y }) => `${x}% ${y}%`)
    .join(', ');
}

export const EmployeeThumbnail: React.FunctionComponent<EmployeeThumbnailProps> = ({
  imageUrl,
  sizeInPixels,
  variant = 'round',
}): React.ReactElement => (
  <StyledImage
    className="photo"
    alt="employee photo"
    fallbackImage={<MissingProfile variant={variant} size={sizeInPixels} />}
    height={sizeInPixels}
    width={sizeInPixels}
    src={`${imageUrl}`}
    variant={variant}
  />
);

interface ImageProps {
  variant: string;
}

const sharedVariantStyles = (variant: string): string => `
  ${variant === 'squircle' ? `clip-path: polygon(${squircleClipPath(6)});` : 'border-radius: 50%;'};
`;

const StyledImage = styled(ReactImageFallback)<ImageProps>`
  ${({ variant }) => sharedVariantStyles(variant)}
`;

const StyledSVG = styled.svg<ImageProps>`
  ${({ variant }) => sharedVariantStyles(variant)}
`;
