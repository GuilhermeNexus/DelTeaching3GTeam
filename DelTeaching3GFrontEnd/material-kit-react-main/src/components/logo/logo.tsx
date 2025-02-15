import type { BoxProps } from '@mui/material/Box';

import { useId, forwardRef } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  isSingle?: boolean;
  disableLink?: boolean;
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    { width, href = '/', height, isSingle = true, disableLink = false, className, sx, ...other },
    ref
  ) => {
    const theme = useTheme();

    const gradientId = useId();

    const TEXT_PRIMARY = theme.vars.palette.text.primary;
    const PRIMARY_LIGHT = theme.vars.palette.primary.light;
    const PRIMARY_MAIN = theme.vars.palette.primary.main;
    const PRIMARY_DARKER = theme.vars.palette.primary.dark;

    /*
    * OR using local (public folder)
    *
    const singleLogo = (
      <Box
        alt="Single logo"
        component="img"
        src={`/logo/logo-single.svg`}
        width="100%"
        height="100%"
      />
    );

    const fullLogo = (
      <Box
        alt="Full logo"
        component="img"
        src={`/logo/logo-full.svg`}
        width="100%"
        height="100%"
      />
    );
    *
    */

    const singleLogo = (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1080" height="1080" viewBox="0 0 1080 1080" xmlSpace="preserve">
        <desc>Created with Fabric.js 5.2.4</desc>
        <defs />
        <g transform="matrix(1 0 0 1 540 540)" id="29db01cd-27b4-4e09-a49b-e738c773eab6">
          <rect
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(255,255,255)',
              fillRule: 'nonzero',
              opacity: 1,
              visibility: 'hidden',
            }}
            vectorEffect="non-scaling-stroke"
            x="-540"
            y="-540"
            rx="0"
            ry="0"
            width="1080"
            height="1080"
          />
        </g>
        <g transform="matrix(1 0 0 1 540 540)" id="fa0e6e57-2e4e-43b8-8f94-fb69f6119bc2" />
        <g transform="matrix(1 0 0 1 540.5 540.5)" id="5b47d946-fe6c-4437-94c6-5a613c0d1874">
          <text
            xmlSpace="preserve"
            fontFamily="Raleway"
            fontSize="105"
            fontStyle="normal"
            fontWeight="900"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(0,0,0)',
              fillRule: 'nonzero',
              opacity: 1,
              whiteSpace: 'pre',
            }}
          >
            <tspan x="-69.3" y="32.98">
              3G
            </tspan>
          </text>
        </g>
      </svg>
        );

        const fullLogo = (
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1080" height="1080" viewBox="0 0 1080 1080" xmlSpace="preserve">
        <desc>Created with Fabric.js 5.2.4</desc>
        <defs />
        <g transform="matrix(1 0 0 1 540 540)" id="29db01cd-27b4-4e09-a49b-e738c773eab6">
          <rect
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(255,255,255)',
              fillRule: 'nonzero',
              opacity: 1,
              visibility: 'hidden',
            }}
            vectorEffect="non-scaling-stroke"
            x="-540"
            y="-540"
            rx="0"
            ry="0"
            width="1080"
            height="1080"
          />
        </g>
        <g transform="matrix(1 0 0 1 540 540)" id="fa0e6e57-2e4e-43b8-8f94-fb69f6119bc2" />
        <g transform="matrix(1 0 0 1 540.5 540.5)" id="5b47d946-fe6c-4437-94c6-5a613c0d1874">
          <text
            xmlSpace="preserve"
            fontFamily="Raleway"
            fontSize="105"
            fontStyle="normal"
            fontWeight="900"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(0,0,0)',
              fillRule: 'nonzero',
              opacity: 1,
              whiteSpace: 'pre',
            }}
          >
            <tspan x="-69.3" y="32.98">
              3G
            </tspan>
          </text>
        </g>
      </svg>
    );

    const baseSize = {
      width: width ?? 40,
      height: height ?? 40,
      ...(!isSingle && {
        width: width ?? 102,
        height: height ?? 36,
      }),
    };

    return (
      <Box
        ref={ref}
        component={RouterLink}
        href={href}
        className={logoClasses.root.concat(className ? ` ${className}` : '')}
        aria-label="Logo"
        sx={{
          ...baseSize,
          flexShrink: 0,
          display: 'inline-flex',
          verticalAlign: 'middle',
          ...(disableLink && { pointerEvents: 'none' }),
          ...sx,
        }}
        {...other}
      >
        {isSingle ? singleLogo : fullLogo}
      </Box>
    );
  }
);
