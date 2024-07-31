// React Imports
import { forwardRef } from 'react';

// Next Imports
import { Link, LinkProps } from 'react-router-dom';
import type { NavLinkProps } from 'react-router-dom';

// Type Imports
import type { ChildrenType } from '../types';

type RouterLinkProps = LinkProps &
  Partial<ChildrenType> & {
    className?: string;
  };

export const RouterLink = forwardRef((props: RouterLinkProps, ref: any) => {
  // Props
  const { to, className, ...other } = props;

  return (
    <Link ref={ref} to={to} className={className} {...other}>
      {props.children}
    </Link>
  );
});
