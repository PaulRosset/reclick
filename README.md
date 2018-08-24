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

> **React v16.0 required**, [rendering arrays in render method.](https://reactjs.org/blog/2017/09/26/react-v16.0.html)

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

`Reclick` is using the [`ref`](https://reactjs.org/docs/refs-and-the-dom.html), to determine what have to be shown on the screen, since ref could be little tricky to get due to nested children components, so we let you the possibility to pass as `props`, the refs (source, destination).

For example, `Reclick` can't determine the correct `ref` when using a CSS-IN-JS library, such as **styled-components** with the [`innerRef`](https://github.com/styled-components/styled-components/issues/927).

So, you can do this to make it work:

- React, [`ref forwarding`](https://reactjs.org/docs/forwarding-refs.html):

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton" {...props}>
    {props.children}
  </button>
));
```

- Using **styled-components** as an example:

```jsx
import styled from "styled-components"

const Styled = styled.div`
  border: 2px solid green;
`;

const FancyDiv = React.forwardRef((props, ref) => (
  <Styled innerRef={ref} {...props}>
    Im a div with some fancy borders!
  </Styled>
));
```

- Then:
```jsx
this.refsource = React.createRef();
this.refdest = React.createRef();
...
<ReClick refsrc={this.refsource.current} refdest={this.refdest.current}>
  <FancyDiv ref={this.refsource} source>
    Click me!
  </FancyDiv>
  <FancyButton ref={this.refdest} destination>
    Im now visible!
  </FancyButton>
</ReClick>
```

> By default, if no props are passed, `Reclick` will try to get the ref alone.

## API/Props

|Setting|Default|Type|Role|
|--- |--- |--- |--- |
|states|`undefined`|func|Props function that give you the state `isOpen`, to let you construct animation for example.|
|refsrc|`undefined`|node|Give the ref of the source element if you are using a custom component as described above|
|refdest|`undefined`|node|Give the ref of the destination element if you are using a custom component as described above|

> If you want to pass a **_React Component_** as a source or destination, make sure that they got a onClick props at their root.

## Live demo/Sandbox

[![Edit 746qom1oqx](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/746qom1oqx)

## License

MIT Paul Rosset
