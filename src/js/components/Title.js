import React from "react";

/**
 * Title component
 */
export default class Title extends React.Component {
    render() {
        let { name, changeCollapse } = this.props;

        return (
            <div className="title">
                <h4>{ name }</h4>
                <a href="#" onClick={ changeCollapse }>
                    <span className="arrow"></span>
                </a>
            </div>
        );
    }
}