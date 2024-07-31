import type { SVGAttributes } from 'react';
import { memo } from 'react';

const LogoZapBlue = (props: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={'0 0 270 96'}
    width={'100%'}
    height={'100%'}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M21.756 84.425c.028-.373.31-.406.496-.513 7.935-4.539 15.876-9.069 23.811-13.608.535-.306 1.076-.507 1.703-.457.318.026.64.005.96.005l74.737-.001c.479 0 .959-.01 1.438-.024.331-.01.513-.216.562-.517.044-.274.056-.554.056-.832.004-2.944.003-5.887.002-8.831l-.001-.12c-.038-1.085-.153-1.2-1.278-1.238-.4-.013-.8-.005-1.2-.005H90.177c-.05-.46.292-.506.501-.628 2.446-1.434 4.902-2.847 7.348-4.28 7.818-4.583 15.754-8.96 23.637-13.429 1.042-.59 2.075-1.198 3.128-1.767.521-.282.735-.681.73-1.255-.011-1.273.001-2.546.002-3.819 0-1.949.007-3.898-.004-5.847-.008-1.327-.121-1.432-1.424-1.457-.36-.007-.72-.002-1.08-.002-12.836 0-25.672 0-38.508-.002-.422 0-.844-.026-1.277-.041.074-.37.35-.406.541-.515 7.692-4.401 15.392-8.789 23.08-13.197.616-.354 1.23-.54 1.931-.497.359.022.72.003 1.08.003h100.769c.68 0 1.36.004 2.039.012 4.326.053 8.489.93 12.487 2.545 8.411 3.397 14.727 9.126 18.964 17.098a34.152 34.152 0 0 1 3.688 11.404c.257 1.852.464 3.708.432 5.58-.126 7.341-2.122 14.123-6.293 20.204-4.858 7.081-11.413 11.929-19.655 14.479-2.291.708-4.634 1.144-7.026 1.399-1.598.17-3.189.175-4.786.18-3.558.01-7.117.006-10.676.002-1.341-.002-1.374-.025-1.376-1.31-.007-4.814-.004-9.627-.001-14.44 0-.278.015-.557.049-.832.034-.275.251-.393.528-.288.335.128.665.272.993.418 3.43 1.535 7.045 2.163 10.761 1.785 7.732-.785 13.573-4.594 17.481-11.284 1.444-2.47 2.338-5.16 2.617-7.995.783-7.984-1.9-14.621-8.105-19.768-2.94-2.438-6.351-3.929-10.144-4.564-1.226-.205-2.463-.358-3.689-.343-3.141.037-6.187.622-9.06 1.947-.181.084-.358.177-.54.258-.719.319-.844.249-.888-.498-.021-.357-.015-.717-.058-1.071-.048-.39-.229-.574-.611-.618a9.487 9.487 0 0 0-1.076-.049c-2.719-.004-5.439.002-8.158-.003-1.957-.004-1.729.145-1.729 1.698-.004 18.339-.003 36.677-.003 55.016 0 .398.012.797-.009 1.194-.031.568-.174.713-.715.74-.359.017-.72.008-1.08.008h-39.828l-122.002-.001c-.468 0-.935-.02-1.406-.03Zm144.085-16.98c.175.344.106.667.112.98.03 1.413.026 1.422 1.384 1.425 2.958.005 5.917.002 8.875 0 .28 0 .56-.007.838-.032.267-.024.453-.186.489-.444a7.77 7.77 0 0 0 .071-1.067c.003-13.642.004-27.283.001-40.925 0-1.498-.071-1.573-1.534-1.578-2.879-.01-5.757-.005-8.635 0-.319 0-.641.015-.954.067-.304.05-.496.253-.509.574-.019.477-.017.954-.04 1.43-.016.314-.201.441-.473.335a15.528 15.528 0 0 1-.878-.383c-2.829-1.319-5.831-1.938-8.93-1.991-1.749-.03-3.495.193-5.22.59-11.521 2.647-19.087 14.105-16.672 25.838 1.751 8.502 8.884 16.458 19.676 17.52 3.927.387 7.724-.29 11.319-1.965.318-.148.599-.407 1.08-.374Z"
    />
    <path
      fill="#fff"
      d="M40.266 50.088c1.31-.752 2.62-1.506 3.931-2.256 5.75-3.284 11.505-6.558 17.245-9.859a4.333 4.333 0 0 1 2.263-.604c12.506.02 25.012.013 37.518.017.344 0 .702-.067 1.042.078-.089.296-.344.343-.536.454-6.673 3.837-13.346 7.674-20.025 11.5-1.878 1.076-1.265.875-3.261.876-12.267.007-24.533.003-36.8.003h-1.31l-.067-.209ZM208.873 58.27c-5.735.15-10.505-4.812-10.48-10.456.023-5.298 4.323-10.427 10.563-10.417 5.106.009 10.382 3.91 10.415 10.443.032 6.463-5.33 10.583-10.498 10.43ZM155.502 58.27c-5.98.169-10.498-5.002-10.553-10.275-.055-5.167 4.047-10.523 10.401-10.592 6.14-.066 10.584 4.965 10.609 10.379.027 5.845-4.853 10.626-10.457 10.488Z"
    />
  </svg>
);

export default memo(LogoZapBlue);
