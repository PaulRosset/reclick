import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ReClick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.refSource = this.props.refsrc || null;
    this.refDestination = this.props.refdest || null;
    this.props.states ? this.props.states(this.state) : null;
  }

  componentDidMount() {
    window.addEventListener("click", this.getClick);
  }

  getClick = e => {
    if (
      this.state.isOpen &&
      e.target !== this.refDestination &&
      e.target !== this.refSource
    ) {
      this.setState(
        {
          isOpen: false
        },
        () => (this.props.states ? this.props.states(this.state) : null)
      );
    }
  };

  onClickSource = e => {
    this.setState(
      prevState => ({
        isOpen: !prevState.isOpen
      }),
      () => (this.props.states ? this.props.states(this.state) : null)
    );
  };

  getRefSource = ref => {
    this.refSource = ref;
  };

  getRefDestination = ref => {
    this.refDestination = ref;
  };

  onKeyBoardSource = e => {
    switch (e.keyCode) {
      case 13:
        this.setState(
          prevState => ({
            isOpen: !prevState.isOpen
          }),
          () => (this.props.states ? this.props.states(this.state) : null)
        );
        break;
      default:
        break;
    }
  };

  render() {
    const ChildrenWithMouseEvent = React.Children.map(
      this.props.children,
      child => {
        return child.props.source
          ? React.cloneElement(child, {
              onClick: this.onClickSource,
              onKeyDown: this.onKeyBoardSource,
              ref: this.getRefSource,
              role: "source",
              tabIndex: 0,
              "aria-hidden": false
            })
          : child.props.destination
            ? React.cloneElement(child, {
                ref: this.getRefDestination,
                role: "destination",
                "aria-hidden": !this.state.isOpen
              })
            : null;
      }
    );
    return this.state.isOpen
      ? ChildrenWithMouseEvent.slice(0, 2)
      : ChildrenWithMouseEvent.splice(
          ChildrenWithMouseEvent.findIndex(elem => elem.props.source),
          1
        );
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.getClick);
  }
}

ReClick.propTypes = {
  states: PropTypes.func,
  refsrc: PropTypes.node,
  refdest: PropTypes.node
};
