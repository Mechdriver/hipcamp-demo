import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

require('sierra-library/dist/sierra.min.css');
require('../styles/campStyles.scss');

class FeatureList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            features: [],
            expandedIds: []
        }

        this.loadFeatures = this.loadFeatures.bind(this);
        this.generateFeatureList = this.generateFeatureList.bind(this);
        this.getFeatureButton = this.getFeatureButton.bind(this);
        this.handleListToggle = this.handleListToggle.bind(this);
    }

    componentDidMount() {
        this.loadFeatures();
    }

    //Fetch the camp features from the API
    loadFeatures() {
        fetch('camp-features')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                features: data
            });
        });
    }

    //Builds a 2D array as the feature buttons are clicked.
    //Checks the existence of the feature's title.
    //Adds the title if it does not exist.
    //Removes the title if it does exist.
    handleListToggle(id, depth, title, length) {
        let newExpandedIds = this.state.expandedIds;

        if (length == 0) {
            return
        }

        if (newExpandedIds[depth] === undefined) {
            newExpandedIds[depth] = []
        }

        if (newExpandedIds[depth][id] === undefined) {
            newExpandedIds[depth][id] = []
        }

        //In order to avoid depth and id collisions, store the title of the feature.
        //Will break if we have the exact same title at the exact same id
        //at a different depth.
        if (newExpandedIds[depth][id].includes(title)) {
            let titleNdx = newExpandedIds[depth][id].indexOf(title);
            newExpandedIds[depth][id].splice(titleNdx, 1);
        } else {
            newExpandedIds[depth][id].push(title);
        }

        this.setState({expandedIds: newExpandedIds});
    }

    generateFeatureList(features, depth) {
        return (
            <ul>
                {features.map((feature, ndx) => {
                    let element = this.getFeatureButton(feature, ndx, depth);
                    return (
                        <li key={ndx}>
                            {element}
                        </li>
                    );
                })}
            </ul>
        );
    }

    getFeatureButton(feature, id, depth) {
        let buttonStyle = 'button block-mobile button-red';
        let buttonIcon = <Fragment></Fragment>;
        let renderSubFeatures = false;
        let expandedIds = this.state.expandedIds;

        if (expandedIds[depth] !== undefined &&
            expandedIds[depth][id] !== undefined &&
            expandedIds[depth][id].includes(feature.title) &&
            feature.subfeatures.length > 0) {

            renderSubFeatures = true;
            buttonIcon = <i className='fas fa-minus'></i>;
        }

        if (!renderSubFeatures && feature.subfeatures.length > 0) {
            buttonIcon = <i className='fas fa-plus'></i>;
        }

        if (feature.presence) {
            buttonStyle = 'button block-mobile button-green';
        }

        return (
            <Fragment>
                <button className={buttonStyle} onClick={() => this.handleListToggle(id, depth, feature.title, feature.subfeatures.length)}>
                    <span>{feature.title}</span>
                    {buttonIcon}
                </button>
                {renderSubFeatures &&
                    this.generateFeatureList(feature.subfeatures, depth + 1)
                }
            </Fragment>
        );
    }

    render() {
        return (
            <Fragment>
                {this.generateFeatureList(this.state.features, 0)}
            </Fragment>
        );
    }
}

module.exports = FeatureList;
