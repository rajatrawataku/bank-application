import * as React from 'react';
import { IBankData } from 'src/types';

export const BankDetailsContext = React.createContext<IBankData | undefined>(undefined);
