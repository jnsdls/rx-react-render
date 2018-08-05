# &lt;RxReactRender /&gt; [![npm][npm]][npm-url] [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.com/jnsdls/rx-react-render.svg?branch=master)](https://travis-ci.com/jnsdls/rx-react-render)

A rxjs observable -> render function component for React.

- [Getting Started](#getting-started)
- [Motivation](#motivation)
- [Examples](#examples)
- [Props](#props)
- [Helpers](#helpers)
- [License](#license)

## Getting Started

You can either install the module via `npm` or `yarn`:

```
npm install @jnsdls/rx-react-render --save
```

```
yarn add @jnsdls/rx-react-render
```

## Motivation

I wanted a dead simple way to get rxjs observable values rendered. Existing solutions included all kinds of capabilities that I did not need. All I wanted is to pass an observable, and get its value as it changed over time passed through a render function.

RxReactRender makes **no** assumptions about how you create your observables or what data they contain. Instead it handles subscribtion & unsubscription and gives you the current values. That's it.

## Examples

### Basic Usage

A very simple and minimal example of how to set up RxReactRender which takes an interval() observable and renders a span with the elapsed seconds inside.

```js
import React from 'react';
import ReactDOM from 'react-dom';

import { interval } from 'rxjs';
import RxReactRender from '@jnsdls/rx-react-render';

ReactDOM.render(
  <RxReactRender interval={interval(1000)}>
    {({ interval }) => <span>Elapsed Seconds: {interval}</span>}
  </RxReactRender>,
  document.getElementById('root')
);
```

[![Edit RxReactRender Basic Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/rj2nw0vr5m)

### Usage in combination with non-observable props

```js
import React from 'react';
import ReactDOM from 'react-dom';

import { interval } from 'rxjs';
import RxReactRender from '@jnsdls/rx-react-render';

ReactDOM.render(
  <RxReactRender interval={interval(1000)} title="Elapsed Seconds (as prop):">
    {({ interval, title }) => (
      <span>
        {title} {interval}
      </span>
    )}
  </RxReactRender>,
  document.getElementById('root')
);
```

[![Edit RxReactRender Combined Props Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/9jrr01kqy4)

### Here's a contrived **but interactive** example for how you could use this for an input

```js
import React from 'react';
import ReactDOM from 'react-dom';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import RxReactRender from '@jnsdls/rx-react-render';

const inputState$ = new BehaviorSubject('');

ReactDOM.render(
  <RxReactRender
    inputValue={inputState$.pipe(
      map(str =>
        str
          .split('')
          .reverse()
          .join('')
      )
    )}
    title="This input will reverse your input on every key press:"
  >
    {({ inputValue, title }) => (
      <span>
        {title} <input value={inputValue} onChange={e => inputState$.next(e.target.value)} />
      </span>
    )}
  </RxReactRender>,
  document.getElementById('root')
);
```

[![Edit RxReactRender Combined Props Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pyx29lyrq)

## Props

| Name            |     Type     | Default | Description                                                                                         |
| :-------------- | :----------: | :-----: | :-------------------------------------------------------------------------------------------------- |
| **children**    |  `function`  | `null`  | A render function that will receive an object of values that map to the observables you passed      |
| **observables** | `Observable` | `null`  | Any observable you pass will be subscribed to and the valye passed into the render function         |
| **other props** |    `any`     | `null`  | Any non-observable props you pass will not be touched and simply forwarded into the render function |

## License

MIT

[npm]: https://img.shields.io/npm/v/@jnsdls/rx-react-render.svg
[npm-url]: https://npmjs.com/package/@jnsdls/rx-react-render
