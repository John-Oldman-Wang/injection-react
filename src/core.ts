import { Injector } from 'injection-js';
import React from 'react';
import { context, Consumer } from './injection_context';

interface StateLessComponentProps {
    props?: any;
    injector?: Injector;
}

export type WithInjectorStateLessFunctionArguments<T> = [props: T, injector?: Injector];

export const stateLessComponentWithInjector = <T>(
    stateLessFunction: (...args: WithInjectorStateLessFunctionArguments<T>) => JSX.Element
) => {
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
