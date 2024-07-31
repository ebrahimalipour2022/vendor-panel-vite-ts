import type { SVGAttributes } from 'react'

const ArrowLeftIcon = (props: SVGAttributes<SVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={'100%'} height={'100%'} viewBox='0 0 20 20' fill='none' {...props}>
    <path
      d='M8.99992 10L12.2499 13.25C12.4027 13.4028 12.4791 13.5972 12.4791 13.8334C12.4791 14.0695 12.4027 14.2639 12.2499 14.4167C12.0971 14.5695 11.9027 14.6459 11.6666 14.6459C11.4305 14.6459 11.236 14.5695 11.0833 14.4167L7.24992 10.5834C7.16659 10.5 7.10756 10.4097 7.07284 10.3125C7.03811 10.2153 7.02075 10.1111 7.02075 10C7.02075 9.88891 7.03811 9.78474 7.07284 9.68752C7.10756 9.5903 7.16659 9.50002 7.24992 9.41669L11.0833 5.58335C11.236 5.43058 11.4305 5.35419 11.6666 5.35419C11.9027 5.35419 12.0971 5.43058 12.2499 5.58335C12.4027 5.73613 12.4791 5.93058 12.4791 6.16669C12.4791 6.4028 12.4027 6.59724 12.2499 6.75002L8.99992 10Z'
      fill='var(--mui-palette-text-secondary)'
    />
  </svg>
)

export default ArrowLeftIcon