/**
 * created by waweru
 */
import * as React from "react";

interface IHelloProps {
  name: string;
  version?: string;
}

class Hello extends React.Component<IHelloProps, any> {
  render() {
    return <div>Hello, {this.props.name} <small>version: {(this.props.version) ? this.props.version : 'none'}</small></div>;
  }
}

export default Hello;