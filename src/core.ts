import { Injector } from 'injection-js';
import React from 'react';
import { context, Consumer } from './injection_context';

interface StateLessComponentProps {
    props?: any;
    injector?: Injector;
}

export interface WithInjectorStateLessFunction<T> {
    (props: T, injector?: Injector): JSX.Element | any;
}

export type WithInjectorStateLessFunctionArguments<T> = Parameters<WithInjectorStateLessFunction<T>>;

export const stateLessComponentWithInjector = <T>(stateLessFunction: WithInjectorStateLessFunction<T>) => {
    function StateLessComponent({ props, injector }: StateLessComponentProps) {
        return stateLessFunction(props, injector);
    }
    StateLessComponent.displayName = `injector.${stateLessFunction.name || 'Unknow'}`;
    return function (props: T) {
        return React.createElement(Consumer, null, (injector: Injector) =>
            React.createElement(StateLessComponent, {
                props,
                injector
            })
        );
    };
};

export class InjectorComponent<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
    static contextType: React.Context<Injector> = context;
    get(injectToken: any) {
        return this.context.get(injectToken);
    }
}
