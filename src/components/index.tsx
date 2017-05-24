/**
 * created by waweru
 */

import * as React from 'react';
import {DropdownComponent} from './dropdown';

interface IProps {
  name: string;
  version?: string;
}

interface IState {
  open: false;
}

export class HelloComponent extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      open: false
    };
  }

  private handleClick() {
    this.setState((prevState: IState) => {
      return {open: !prevState.open};
    });
  }

  private renderSelector() {
    return (
      <p
        onClick={()=>this.handleClick()}
        onBlur={()=>this.handleClick()}
      >
        Select an item
      </p>
    );
  }

  public render() {
    return (
      <div style={{margin: 0, padding: 0}}>
        <DropdownComponent
            items={
              ['Item #1', 'Item #2', 'Item #3'].map((item: string, idx: number) => {
                return (
                  <p key={idx}>{item}</p>
                );
              })
            }
            open={this.state.open}
            handleClick={() => this.handleClick()}
        />
      </div>
    );
  }

}
