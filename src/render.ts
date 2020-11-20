import React, { CElement, Component, ComponentState, DOMAttributes, DOMElement, ReactElement, SFCElement } from 'react';
import { render, Renderer, hydrate } from 'react-dom';
import { Provider as InjectorProvider, ReflectiveInjector } from 'injection-js';
import { Provider } from './injection_context';

export interface RendererR {
    <T extends Element>(element: DOMElement<DOMAttributes<T>, T>, container: Element | DocumentFragment | null, callback?: () => void): T;

    (element: Array<DOMElement<DOMAttributes<any>, any>>, container: Element | DocumentFragment | null, callback?: () => void): Element;

    (element: SFCElement<any> | Array<SFCElement<any>>, container: Element | DocumentFragment | null, callback?: () => void): void;

    <P, T extends Component<P, ComponentState>>(
        element: CElement<P, T>,
        container: Element | DocumentFragment | null,
        callback?: () => void
    ): T;

    (
        element: Array<CElement<any, Component<any, ComponentState>>>,
        container: Element | DocumentFragment | null,
        callback?: () => void
    ): Component<any, ComponentState>;

    <P>(element: ReactElement<P>, container: Element | DocumentFragment | null, callback?: () => void):
        | Component<P, ComponentState>
        | Element
        | void;

    (element: ReactElement[], container: Element | DocumentFragment | null, callback?: () => void):
        | Component<any, ComponentState>
        | Element
        | void;

    (element: ReactElement, container: Element | DocumentFragment | null, callback?: () => void):
        | Component<any, ComponentState>
        | Element
        | void;
}

export const injectionFactory = (method: RendererR) => (providers: InjectorProvider[], ...args: Parameters<RendererR>) => {
    const [element, container, callback] = args;
    const rootInjector = ReflectiveInjector.resolveAndCreate(providers);

    return method(
        React.createElement(
            Provider,
            {
                value: rootInjector
            },
            element
        ),
        container,
        callback
    );
};

export function injectionRender(providers: InjectorProvider[], ...args: Parameters<RendererR>): ReturnType<Renderer> {
    const [element, container, callback] = args;
    const rootInjector = ReflectiveInjector.resolveAndCreate(providers);

    return render(
        React.createElement(
            Provider,
            {
                value: rootInjector
            },
            element
        ),
        container,
        callback
    );
}

export const injectionHydrate = injectionFactory(hydrate);
