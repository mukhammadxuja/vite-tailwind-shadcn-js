import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link, useLocation } from 'react-router-dom';

function CustomBreadcrumb({ subtitle }) {
  const location = useLocation();

  const pathSegments = location.pathname
    .replace('/dashboard', '')
    .split('/')
    .filter((segment) => segment);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/dashboard/${pathSegments.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSegments.length - 1;

    return (
      <BreadcrumbItem key={path} className={isLast ? '' : 'hidden md:block'}>
        {isLast ? (
          <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink as={Link} to={path}>
            {capitalize(segment)}
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink as={Link} to="/dashboard" className="cursor-pointer">
            Building Your Application
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems.length > 0 && <BreadcrumbSeparator />}
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default CustomBreadcrumb;
