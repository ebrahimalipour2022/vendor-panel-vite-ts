import type { SVGAttributes } from 'react';
import { memo } from 'react';

const OrderAddressIcon = (props: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M16.7 14.5L20.5 11.25L21.15 11.3C21.4333 11.3333 21.6542 11.45 21.8125 11.65C21.9708 11.85 22.05 12.0666 22.05 12.3C22.05 12.4333 22.025 12.5666 21.975 12.7C21.925 12.8333 21.8333 12.95 21.7 13.05L19.1 15.325L19.875 18.7C19.8917 18.7333 19.9 18.7708 19.9 18.8125V18.925C19.9 19.2083 19.8 19.4458 19.6 19.6375C19.4 19.8291 19.1667 19.925 18.9 19.925C18.8167 19.925 18.7292 19.9125 18.6375 19.8875C18.5458 19.8625 18.4583 19.825 18.375 19.775L17.85 19.45L16.7 14.5ZM14.35 7.19995L13.3 4.74995L13.525 4.19995C13.6083 3.99995 13.7375 3.84578 13.9125 3.73745C14.0875 3.62912 14.2667 3.57495 14.45 3.57495C14.6333 3.57495 14.8125 3.62495 14.9875 3.72495C15.1625 3.82495 15.2917 3.97495 15.375 4.17495L16.75 7.42495L14.35 7.19995ZM7.35001 16.825L10.5 14.925L13.65 16.85L12.825 13.25L15.6 10.85L11.95 10.525L10.5 7.12495L9.05001 10.5L5.40001 10.825L8.17501 13.25L7.35001 16.825ZM4.85001 18.7L5.95001 13.975L2.27501 10.8C2.14168 10.7 2.05418 10.5833 2.01251 10.45C1.97085 10.3166 1.95001 10.1833 1.95001 10.05C1.95001 9.81662 2.02918 9.59995 2.18751 9.39995C2.34585 9.19995 2.56668 9.08328 2.85001 9.04995L7.70001 8.62495L9.57501 4.17495C9.65835 3.97495 9.78751 3.82495 9.96251 3.72495C10.1375 3.62495 10.3167 3.57495 10.5 3.57495C10.6833 3.57495 10.8625 3.62495 11.0375 3.72495C11.2125 3.82495 11.3417 3.97495 11.425 4.17495L13.3 8.62495L18.15 9.04995C18.4333 9.08328 18.6542 9.19995 18.8125 9.39995C18.9708 9.59995 19.05 9.81662 19.05 10.05C19.05 10.1833 19.0292 10.3166 18.9875 10.45C18.9458 10.5833 18.8583 10.7 18.725 10.8L15.05 13.975L16.15 18.7C16.1667 18.75 16.175 18.825 16.175 18.925C16.175 19.2083 16.075 19.4458 15.875 19.6375C15.675 19.8291 15.4417 19.925 15.175 19.925C15.125 19.925 14.95 19.875 14.65 19.775L10.5 17.275L6.35001 19.775C6.26668 19.825 6.17918 19.8625 6.08751 19.8875C5.99585 19.9125 5.90835 19.925 5.82501 19.925C5.52501 19.925 5.26668 19.8041 5.05001 19.5625C4.83335 19.3208 4.76668 19.0333 4.85001 18.7Z"
      fill="#E7F1FF"
    />
  </svg>
);

export default memo(OrderAddressIcon);
