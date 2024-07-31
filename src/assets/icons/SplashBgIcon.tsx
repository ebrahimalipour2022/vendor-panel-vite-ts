import * as React from 'react';
import { memo, SVGAttributes } from 'react';

const SplashBgIcon = (props: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={'100%'}
    height={'100%'}
    viewBox="0 0 360 516"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="url(#b)"
        d="m481.885 406.593-73.938 128.064L34.2 322.549-2.201 186.698l484.086 219.895Z"
      />
      <path
        fill="url(#c)"
        d="m454.25 303.454-73.938 128.065L6.565 219.41-29.836 83.56 454.25 303.453Z"
      />
      <path
        fill="url(#d)"
        d="m424.811 193.589-73.939 128.065-373.747-212.109-36.4-135.85L424.81 193.588Z"
      />
      <path
        fill="url(#e)"
        d="M395.279 23.425h29.002v533.978h-29.002z"
        opacity={0.2}
        transform="rotate(56.908 395.279 23.425)"
      />
      <path
        fill="url(#f)"
        d="M370.369 74.295h74.627v533.978h-74.627z"
        opacity={0.2}
        transform="rotate(56.908 370.369 74.295)"
      />
      <path
        fill="url(#g)"
        d="M370.373 162.866h33.95v533.978h-33.95z"
        opacity={0.2}
        transform="rotate(56.91 370.373 162.866)"
      />
      <path
        stroke="#fff"
        strokeWidth={2}
        d="M-173.09 270.056s113.728 60.015 197.535 29.088c81.021-29.899 174.235-126.304 254.404-158.409 109.91-44.015 225.822 60.025 225.822 60.025"
      />
      <path
        stroke="#fff"
        strokeDasharray="4 4"
        strokeWidth={2}
        d="M-172.43 309.648s113.978 60.162 197.956 29.185c81.187-29.947 174.579-126.537 254.912-158.695 110.133-44.087 226.307 60.191 226.307 60.191"
      />
      <path
        stroke="#fff"
        strokeWidth={2}
        d="M-168.27 347.061s113.776 59.966 197.69 28.927c81.126-30.006 174.518-126.596 254.793-158.81 110.054-44.164 225.973 59.868 225.973 59.868"
      />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={265.538}
        x2={64.526}
        y1={307.155}
        y2={746.244}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4366F4" />
        <stop offset={1} stopColor="#2F52E0" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={237.904}
        x2={36.891}
        y1={204.017}
        y2={643.106}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4366F4" />
        <stop offset={1} stopColor="#2F52E0" />
      </linearGradient>
      <linearGradient
        id="d"
        x1={208.464}
        x2={7.452}
        y1={94.152}
        y2={533.241}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4366F4" />
        <stop offset={1} stopColor="#2F52E0" />
      </linearGradient>
      <linearGradient
        id="e"
        x1={410.193}
        x2={413.248}
        y1={18.454}
        y2={540.428}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="f"
        x1={408.744}
        x2={409.932}
        y1={69.324}
        y2={591.314}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="g"
        x1={387.831}
        x2={390.441}
        y1={157.895}
        y2={679.874}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h360v516H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default memo(SplashBgIcon);
