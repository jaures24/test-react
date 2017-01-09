import React from "react";

// UI components
import Content from "./Content";
import Nav from "./Nav";
import Title from "./Title";

// stylesheets
import "../../scss/main.scss";

/**
 * Layout component
 */
export default class Layout extends React.Component {
    constructor() {
        super();

        // set state of this component
        this.state = {
          show: true,
          index: 0,
          data: {}
        };
    }

    componentDidMount() {
        // Get content from API
        // Not used Fetch API for legacy browser compatibility
        let req = new XMLHttpRequest();
        req.open("GET", "./content.json", true);

        req.onreadystatechange = (function(res) {
            if (req.readyState == 4) {
                if(req.status == 200) {
                    this.setState({
                        data: JSON.parse(req.responseText)
                    });
                } else {
                    console.error("Error loading data.");
                }
            }
        }).bind(this);
        req.send(null);
    }

    /**
     * To change collapse of content area
     */
    changeCollapse() {
        this.setState({
            show: !this.state.show
        });
    }

    /**
     * Get if prev/next element is available
     * @param {Number} index
     * @param {Boolean|Undefined} next
     * @return {Number}
     */
    getIndex(index, next) {
        let total = this.state.data.content.length;

        if (next) {
            index < total && index++;
        } else {
            index > 0 && index--;
        }

        return index;
    }

    /**
     * Change index callback
     * @param {String} type [ prev|next ]
     */
    changeIndex(type) {
        let index = this.state.index;

        this.setState({
            index: this.getIndex(index, type === "next")
        });
    }

    /**
     * Get prev/next title value
     * @param {Number} index
     * @param {Array} content
     * @return {Object}
     *  { prev: {String}, next: {String} }
     */
    getPrevNextTitle(index, content) {
        let total = content.length;
        let titleIndex;

        return {
            prev: (titleIndex = index - 1) >= 0 ?
                content[ titleIndex ].title : "",
            next: (titleIndex = index + 1) < total ?
                content[ titleIndex ].title : ""
        };
    }

    /**
     * Get current data to display
     * @return {Object}
     *  { content: {Object}, prev: {String}, next: {String} }
     */
    getData() {
        let index = this.state.index;
        let content = this.state.data.content;
        let row = {};

        if (content) {
            row = this.getPrevNextTitle(index, content);
            row.content = content[ index ];
        }

        return row;
    }

    render() {
        let data = this.getData();

        return (
            <li className={ this.state.show ? "" : "collapsed" }>
                <Title changeCollapse={ this.changeCollapse.bind(this) } name={ this.state.data.title } />
                <div className="container">
                    <Content { ...data.content } />
                    <Nav changeIndex={ this.changeIndex.bind(this) } prev={ data.prev } next={ data.next } />
                </div>
            </li>
        );
    }
}
