import * as React from 'react';
import { IWebService } from './web/IWebService';

export interface ServiceContextProps {
  service: IWebService;
}

export const ServiceContext = React.createContext<ServiceContextProps>(undefined);
