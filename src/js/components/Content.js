import React from "react";

/**
 * Content component
 */
export default class Content extends React.Component {
  render() {
    let { thumbnail, description } = this.props;

    return (
        <div className="content">
            { thumbnail &&
                <div className="thumb"><img src={ "./img/"+ thumbnail } /></div> }
            <div className="txt" dangerouslySetInnerHTML={{ __html: description }} ></div>
        </div>
    );
  }
}