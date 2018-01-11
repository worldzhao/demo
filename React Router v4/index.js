import React, {Component} from 'react';
import PropTypes from 'prop-types';

let instances = [];
const register = (comp) => instances.push(comp);
const unregister = (comp) => instances.splice(instances.indexOf(comp), 1);

// Route
const matchPath = (pathname, options) => {
  const {exact = false, path} = options;
  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true,
    }
  }
  const match = new RegExp(`^${path}`).exec(pathname);
  if (!match) {
    // 没有匹配上
    return null;
  }
  const url = match[0];
  const isExact = pathname === url;
  if (exact && !isExact) {
    // 要求精确匹配（exact为真） 却不是精确匹配(isExact为假)
    return null;
  }
  return {
    // 不要求精确匹配(exact === false) 或是精确匹配成功(exact === isExact === true)
    path,
    url,
    isExact
  }
};
export class Route extends Component {
  static propTypes = {
    exact: PropTypes.bool,
    path: PropTypes.string,
    component: PropTypes.func,
    render: PropTypes.func,
  };

  componentWillMount() {
    // 监听前进后退事件
    window.addEventListener("popstate", this.handlePop)
    register(this);
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.handlePop)
    unregister(this);
  }

  handlePop = () => {
    this.forceUpdate()
  };

  render() {
    const {path, exact, component, render} = this.props;
    const match = matchPath(window.location.pathname, {path, exact});
    if (!match) { // 如果没有匹配到，就什么都不渲染
      return null;
    }
    // 如果匹配到了 并且 component 存在
    if (component) {
      // 以 component 创建新元素并且通过 match 传递
      return React.createElement(component, {match});
    }
    // 如果匹配到了 但是没有 component ， 有 render 方法
    if (render) {
      return render({match});
    }
    return null;
  }
}

// Link
const historyPush = (path) => {
  window.history.pushState({}, null, path);
  instances.forEach(instance => instance.forceUpdate());
};

const historyReplace = (path) => {
  window.history.replaceState({}, null, path);
  instances.forEach(instance => instance.forceUpdate());
};

export class Link extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    replace: PropTypes.bool,
  };

  handleClick = (event) => {
    const {replace, to} = this.props;
    event.preventDefault();
    // 这里是路由,仅仅改变url（不会刷新页面）
    replace ? historyReplace(to) : historyPush(to);
  };

  render() {
    const {to, children} = this.props;
    return (
      <a href={to} onClick={this.handleClick}>{children}</a>
    )
  }
}

// Redirect
export class Redirect extends Component {
  static defaultProps = {
    push: false
  }
  static propTypes = {
    to: PropTypes.string.isRequired,
    push: PropTypes.bool.isRequired,
  }
  componentDidMount() {
    const { to, push } = this.props
    push ? historyPush(to) : historyReplace(to)
  }
  render() {
    return null
  }
}
