/**
 * created by waweru
 */

import * as React from 'react';

interface IHelloProps {
  name: string;
  version?: string;
}

class Hello extends React.Component<IHelloProps, any> {

  public render() {
    return (
      <div style={{margin: 0, padding: 0}}>
        <h5>Hello there, {this.props.name}</h5>
        <p>version: {(this.props.version) ? this.props.version : 'none'}</p>
      </div>
    );
  }

}

export default Hello;
