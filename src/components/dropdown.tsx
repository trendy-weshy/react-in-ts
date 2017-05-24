/**
 * created by waweru
 */

import * as React from 'react';

interface IProps {
    items: JSX.Element[];
    align?: string;
    open: boolean;
    handleClick(): void;
    selector?: JSX.Element | undefined;
}

export class DropdownComponent extends React.Component<IProps, any> {

    private classList: string[];

    constructor(props: IProps) {
        super(props);
    }

    private renderDropdown(active: boolean): JSX.Element | null {
        if (active) {
            return (
                <div className="tw-dropdown-container">
                    {
                        ((items: any[]) => {
                            return (
                                <div className="item">
                                    {items.map((item: any, index: number) => (item))}
                                </div>
                            );
                        })(this.props.items)
                    }
                </div>
            );
        } else {
            return null;
        }
    }

    private renderSelector(selector: JSX.Element | undefined): JSX.Element {
        if (!selector) {
            return (
                <button
                    className="tw-selector"
                    onClick={()=>this.props.handleClick()}
                    onBlur={()=>this.props.handleClick()}
                >
                    Dropdown btn
                </button>
            );
        } else {
            return selector;
        }
    }

    private renderItems(items: JSX.Element[]): JSX.Element {
        return (
            <div className="item">
                {items.map((item: JSX.Element) => (item))}
            </div>
        );
    }

    public render() {
        return (
            <div className="tw-dropdown">
                {this.renderSelector(this.props.selector)}
                {this.renderDropdown(this.props.open)}
            </div>
        );
    }
}
