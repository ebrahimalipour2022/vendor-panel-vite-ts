import { SVGAttributes } from 'react';

const MenuIcon = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M3.33333 15C3.09722 15 2.89931 14.9201 2.73958 14.7604C2.57986 14.6007 2.5 14.4028 2.5 14.1667C2.5 13.9306 2.57986 13.7326 2.73958 13.5729C2.89931 13.4132 3.09722 13.3333 3.33333 13.3333H16.6667C16.9028 13.3333 17.1007 13.4132 17.2604 13.5729C17.4201 13.7326 17.5 13.9306 17.5 14.1667C17.5 14.4028 17.4201 14.6007 17.2604 14.7604C17.1007 14.9201 16.9028 15 16.6667 15H3.33333ZM3.33333 10.8333C3.09722 10.8333 2.89931 10.7535 2.73958 10.5938C2.57986 10.434 2.5 10.2361 2.5 10C2.5 9.76389 2.57986 9.56597 2.73958 9.40625C2.89931 9.24653 3.09722 9.16667 3.33333 9.16667H16.6667C16.9028 9.16667 17.1007 9.24653 17.2604 9.40625C17.4201 9.56597 17.5 9.76389 17.5 10C17.5 10.2361 17.4201 10.434 17.2604 10.5938C17.1007 10.7535 16.9028 10.8333 16.6667 10.8333H3.33333ZM3.33333 6.66667C3.09722 6.66667 2.89931 6.58681 2.73958 6.42708C2.57986 6.26736 2.5 6.06944 2.5 5.83333C2.5 5.59722 2.57986 5.39931 2.73958 5.23958C2.89931 5.07986 3.09722 5 3.33333 5H16.6667C16.9028 5 17.1007 5.07986 17.2604 5.23958C17.4201 5.39931 17.5 5.59722 17.5 5.83333C17.5 6.06944 17.4201 6.26736 17.2604 6.42708C17.1007 6.58681 16.9028 6.66667 16.6667 6.66667H3.33333Z"
        fill="#125CCC"
      />
    </svg>
  );
};

export default MenuIcon;
