import React from "react";

/**
 * Navigation component
 */
export default class Nav extends React.Component {
    /**
     * Click event handler
     * @param {Event} e
     */
    changeNav(e) {
        let el = e.target;

        this.props.changeIndex(el.className);
        e.preventDefault();
    }

    render() {
        let { prev, next } = this.props;

        return (
            <div className="nav">
                { prev &&
                    <p><span className="prev-arrow"></span> <a href="#" className="prev" onClick={ this.changeNav.bind(this) }>{ prev }</a></p> }
                { next &&
                    <p className="a_right"><span className="next-arrow"></span> <a href="#" className="next" onClick={ this.changeNav.bind(this) }>{ next }</a></p> }
            </div>
        );
    }
}