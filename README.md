# injection-react
[![Build Status](https://travis-ci.org/mgechev/injection-js.svg?branch=master)](https://travis-ci.org/mgechev/injection-react) ![Downloads](https://img.shields.io/npm/dm/injection-react.svg)

一个可以在react项目中使用的JavaScript和TypeScript依赖注入库。它是Angular依赖注入的一部分，这意味着它具有完整，快速，可靠且经过良好测试的功能。

# 如何不使用Angular获得依赖注入的能力？

Angular 5版本弃用了ReflectiveInjector API，并引入了StaticInjector。 简而言之，最新版本的Angular中的依赖项注入将完全在编译时进行，因此不需要进行反射。

但是，如果您想在Node.js，Vue，React，Vanilla JS，TypeScript等应用程序中使用依赖项注入，您将无法像Angular那样利用“ StaticInjector”优势，因为您的应用程序无法与Angular编译器兼容。

这意味着**如果您的react项目需要在Angular`@angular/core`之外进行依赖注入是不可以的。在这种情况下，请使用`injection-react`以获得快速，小型，可靠，高质量，设计良好且经过测试的解决方案。**

# How to use?

```sh
$ npm i injection-react injection-js
# OR
$ yarn add injection-react injection-js
```

> **Note:**
>
> 对于ES6`Class`语法和TypeScript，您需要[Reflect API](http://www.ecma-international.org/ecma-262/6.0/#sec-reflection)的polyfill.
> You can use:
>
> - [reflection](https://www.npmjs.com/package/@abraham/reflection) (only 3kb 🔥)
> - [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
> - [core-js (`core-js/es7/reflect`)](https://www.npmjs.com/package/core-js)
>
>同样对于TypeScript，您将需要在您的`tsconfig.json`中设置`experimentalDecorators`和`emitDecoratorMetadata`为`true`。

## TypeScript

```tsx
import 'reflect-metadata';
import React from 'react';
import { Injectable } from 'injection-js';
import { render, Component } from 'injection-react';

@Injectable()
class Service {
  getHello(): string {
    return 'Hello World!';
  }
}

class App extends Component {
    render() {
        return (
            <div>{this.get('Service').getHello()}</div>
        );
    }
}

render([{ provide: 'Service', useClass: Service }], <App />, document.body);

```

# API

有关完整的文档，请查看Angular DI文档：

- [Dependency Injection](https://v4.angular.io/guide/dependency-injection)
- [Dependency Injection in action](https://v4.angular.io/guide/dependency-injection-in-action)
- [Dependency Injection without Typescript](https://v2.angular.io/docs/ts/latest/cookbook/ts-to-js.html#!#dependency-injection)

# License

BSD 3-Clause