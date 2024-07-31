import type { SVGAttributes } from 'react';
import { memo } from 'react';

const UploadCameraIcon = (props: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 20 21"
    fill="none"
    {...props}
  >
    <path
      d="M2.49992 18.0002C2.04159 18.0002 1.64922 17.837 1.32284 17.5106C0.996446 17.1842 0.833252 16.7918 0.833252 16.3335V6.3335C0.833252 5.87516 0.996446 5.4828 1.32284 5.15641C1.64922 4.83002 2.04159 4.66683 2.49992 4.66683H5.12492L6.16658 3.54183C6.31936 3.37516 6.50339 3.24322 6.71867 3.146C6.93395 3.04877 7.15964 3.00016 7.39575 3.00016H10.8333C11.0694 3.00016 11.2673 3.08002 11.427 3.23975C11.5867 3.39947 11.6666 3.59738 11.6666 3.8335C11.6666 4.06961 11.5867 4.26752 11.427 4.42725C11.2673 4.58697 11.0694 4.66683 10.8333 4.66683H7.39575L5.87492 6.3335H2.49992V16.3335H15.8333V9.66683C15.8333 9.43072 15.9131 9.2328 16.0728 9.07308C16.2326 8.91336 16.4305 8.8335 16.6666 8.8335C16.9027 8.8335 17.1006 8.91336 17.2603 9.07308C17.4201 9.2328 17.4999 9.43072 17.4999 9.66683V16.3335C17.4999 16.7918 17.3367 17.1842 17.0103 17.5106C16.6839 17.837 16.2916 18.0002 15.8333 18.0002H2.49992ZM15.8333 4.66683H14.9999C14.7638 4.66683 14.5659 4.58697 14.4062 4.42725C14.2464 4.26752 14.1666 4.06961 14.1666 3.8335C14.1666 3.59738 14.2464 3.39947 14.4062 3.23975C14.5659 3.08002 14.7638 3.00016 14.9999 3.00016H15.8333V2.16683C15.8333 1.93072 15.9131 1.7328 16.0728 1.57308C16.2326 1.41336 16.4305 1.3335 16.6666 1.3335C16.9027 1.3335 17.1006 1.41336 17.2603 1.57308C17.4201 1.7328 17.4999 1.93072 17.4999 2.16683V3.00016H18.3333C18.5694 3.00016 18.7673 3.08002 18.927 3.23975C19.0867 3.39947 19.1666 3.59738 19.1666 3.8335C19.1666 4.06961 19.0867 4.26752 18.927 4.42725C18.7673 4.58697 18.5694 4.66683 18.3333 4.66683H17.4999V5.50016C17.4999 5.73627 17.4201 5.93419 17.2603 6.09391C17.1006 6.25363 16.9027 6.3335 16.6666 6.3335C16.4305 6.3335 16.2326 6.25363 16.0728 6.09391C15.9131 5.93419 15.8333 5.73627 15.8333 5.50016V4.66683ZM9.16658 15.0835C10.2083 15.0835 11.0937 14.7189 11.8228 13.9897C12.552 13.2606 12.9166 12.3752 12.9166 11.3335C12.9166 10.2918 12.552 9.40641 11.8228 8.67725C11.0937 7.94808 10.2083 7.5835 9.16658 7.5835C8.12492 7.5835 7.2395 7.94808 6.51033 8.67725C5.78117 9.40641 5.41658 10.2918 5.41658 11.3335C5.41658 12.3752 5.78117 13.2606 6.51033 13.9897C7.2395 14.7189 8.12492 15.0835 9.16658 15.0835ZM9.16658 13.4168C8.58325 13.4168 8.0902 13.2154 7.68742 12.8127C7.28464 12.4099 7.08325 11.9168 7.08325 11.3335C7.08325 10.7502 7.28464 10.2571 7.68742 9.85433C8.0902 9.45155 8.58325 9.25016 9.16658 9.25016C9.74992 9.25016 10.243 9.45155 10.6458 9.85433C11.0485 10.2571 11.2499 10.7502 11.2499 11.3335C11.2499 11.9168 11.0485 12.4099 10.6458 12.8127C10.243 13.2154 9.74992 13.4168 9.16658 13.4168Z"
      fill="#E7F1FF"
    />
  </svg>
);

export default memo(UploadCameraIcon);
