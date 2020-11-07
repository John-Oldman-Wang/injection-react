import { Injector } from 'injection-js';
import { createContext } from 'react';

export const context = createContext<Injector | null>(null);

export const { Provider, Consumer } = context;
