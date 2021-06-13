# injection-react

这个包原本是为了可以在react项目中使用依赖注入而诞生的，但是在原来的设计架构下发现可以开发的api有限，不足够灵活。必须要修改react源代码才可以在实际项目中灵活使用依赖注入，所以有了另外一个包 @de-pa/react。所以请别再使用这个包了，请使用 @de-pa/react。

# How to use?

```sh
$ npm i reflect-metadata injection-js @de-pa/react @de-pa/react-dom
# OR
$ yarn add reflect-metadata injection-js @de-pa/react @de-pa/react-dom
```

## TypeScript

```tsx
import { Component, IComponent, InjectionProvider } from '@de-pa/react';
import { render } from '@de-pa/react-dom';

class Service {
    method() {
        return 'hello world';
    }
}

@IComponent()
class App extends Component {
    constructor(public service: Service) {
        super()
    }
    render() {
        return <div>{this.service.method()}</div>
    }
}

render(<InjectionProvider providers={[Service]}><App /></InjectionProvider>,document.body)
```

# 相关链接

- [@de-pa/react](https://www.npmjs.com/package/@de-pa/react)
- [@de-pa/react-dom](https://www.npmjs.com/package/@de-pa/react-dom)
- [Dependency Injection](https://v4.angular.io/guide/dependency-injection)
- [Dependency Injection in action](https://v4.angular.io/guide/dependency-injection-in-action)
- [Dependency Injection without Typescript](https://v2.angular.io/docs/ts/latest/cookbook/ts-to-js.html#!#dependency-injection)


# License

BSD 3-Clause