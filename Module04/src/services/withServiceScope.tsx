import * as React from 'react';
import { useContext } from 'react';
import { ServiceContext } from './ServiceContext';

//Infuse all components wrapped with this Higher Order Component with the serviceScope
export const withServiceScope = (Component: any) => {
  return (props: any) => {
    const appContext = useContext(ServiceContext);

    return <Component service={appContext.service} {...props} />;
  };
};
