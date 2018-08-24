"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReClick = function (_Component) {
  _inherits(ReClick, _Component);

  function ReClick(props) {
    _classCallCheck(this, ReClick);

    var _this = _possibleConstructorReturn(this, (ReClick.__proto__ || Object.getPrototypeOf(ReClick)).call(this, props));

    _this.getClick = function (e) {
      if (_this.state.isOpen && e.target !== _this.refDestination && e.target !== _this.refSource) {
        _this.setState({
          isOpen: false
        }, function () {
          return _this.props.states ? _this.props.states(_this.state) : null;
        });
      }
    };

    _this.onClickSource = function (e) {
      _this.setState(function (prevState) {
        return {
          isOpen: !prevState.isOpen
        };
      }, function () {
        return _this.props.states ? _this.props.states(_this.state) : null;
      });
    };

    _this.getRefSource = function (ref) {
      _this.refSource = ref;
    };

    _this.getRefDestination = function (ref) {
      _this.refDestination = ref;
    };

    _this.onKeyBoardSource = function (e) {
      switch (e.keyCode) {
        case 13:
          _this.setState(function (prevState) {
            return {
              isOpen: !prevState.isOpen
            };
          }, function () {
            return _this.props.states ? _this.props.states(_this.state) : null;
          });
          break;
        default:
          break;
      }
    };

    _this.state = {
      isOpen: false
    };
    _this.refSource = _this.props.refsrc || null;
    _this.refDestination = _this.props.refdest || null;
    _this.props.states ? _this.props.states(_this.state) : null;
    return _this;
  }

  _createClass(ReClick, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("click", this.getClick);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var ChildrenWithMouseEvent = _react2.default.Children.map(this.props.children, function (child) {
        return child.props.source ? _react2.default.cloneElement(child, {
          onClick: _this2.onClickSource,
          onKeyDown: _this2.onKeyBoardSource,
          ref: _this2.getRefSource,
          role: "source",
          tabIndex: 0,
          "aria-hidden": false
        }) : child.props.destination ? _react2.default.cloneElement(child, {
          ref: _this2.getRefDestination,
          role: "destination",
          "aria-hidden": !_this2.state.isOpen
        }) : null;
      });
      return this.state.isOpen ? ChildrenWithMouseEvent.slice(0, 2) : ChildrenWithMouseEvent.splice(ChildrenWithMouseEvent.findIndex(function (elem) {
        return elem.props.source;
      }), 1);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("click", this.getClick);
    }
  }]);

  return ReClick;
}(_react.Component);

exports.default = ReClick;


ReClick.propTypes = {
  states: _propTypes2.default.func,
  refsrc: _propTypes2.default.node,
  refdest: _propTypes2.default.node
};