# Reclick 👆

#### Clicking Menu in React made simpler!

[![Travis CI Build Status](https://travis-ci.org/PaulRosset/reclick.svg?branch=master)](https://travis-ci.org/PaulRosset/reclick)
[![npm version](https://badge.fury.io/js/reclick.svg)](https://badge.fury.io/js/reclick)

![](demo.gif)

## Install

```sh
yarn add reclick
```

## Usage

> React v16.0 required, [rendering arrays in render method.](https://reactjs.org/blog/2017/09/26/react-v16.0.html)

```js
import React from "react";
import Reclick from "reclick";
```

```jsx
<Reclick>
  <button source>Click me!</button>
  <div destination>
    <a href="#">A</a>
    <a href="#">B</a>
    <a href="#">C</a>
  </div>
</Reclick>
```

> `Reclick` is using the [`ref`](https://reactjs.org/docs/refs-and-the-dom.html), so, it will not work if you use a CSS-IN-JS library that use an other things such as **styled-components** with the [`innerRef`](https://github.com/styled-components/styled-components/issues/927).

## API

* States: Function `states`
  * Function with `isOpen` as parameter `Boolean`, to let you construct animation for example.

> If you want to pass a **_React Component_** as a source or destination, make sure that they got a onClick props at their root.

## Live demo/Sandbox

[![Edit 746qom1oqx](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/746qom1oqx)

## License

MIT Paul Rosset
