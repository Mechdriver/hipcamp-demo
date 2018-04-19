import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

require('sierra-library/dist/sierra.min.css');
require('../styles/campStyles.scss');

class CampFeatures extends Component {
    constructor(props) {
        super(props);

        this.state = {
            features: [],
            expandedIds: []
        };

        this.loadFeatures = this.loadFeatures.bind(this);
        this.featureList = this.featureList.bind(this);
        this.getFeatureElement = this.getFeatureElement.bind(this);
        this.handleListToggle = this.handleListToggle.bind(this);
    }

    componentDidMount() {
        this.loadFeatures();
    }

    handleListToggle(id, depth) {
        let newExpandedIds = this.state.expandedIds;

        if (newExpandedIds[depth] === undefined) {
            newExpandedIds[depth] = []
        }

        if (newExpandedIds[depth].indexOf(id) != -1) {
            let index = newExpandedIds[depth].indexOf(id);
            newExpandedIds[depth][index] = null;
        } else {
            newExpandedIds[depth].push(id);
        }

        this.setState({expandedIds: newExpandedIds})
    }

    loadFeatures() {
        fetch('camp-features')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                features: data}
            );
        });
    }

    featureList(features, depth) {
        return (
            <ul>
                {features.map((feature, ndx) => {
                    let element = this.getFeatureElement(feature, ndx, depth);
                    return (
                        <li key={ndx}>
                            {element}
                        </li>
                    );
                })}
            </ul>
        );
    }

    getFeatureElement(feature, id, depth) {
        let renderSubFeaters = false;
        let expandedIds = this.state.expandedIds;

        if (expandedIds[depth] !== undefined && expandedIds[depth].indexOf(id) != -1) {
            renderSubFeaters = true;
        }

        if (feature.presence) {
            var featureElem = (
                <Fragment>
                    <button className='button button-green block-mobile' onClick={() => this.handleListToggle(id, depth)}>
                        <span>{feature.title}</span>
                        {feature.subfeatures.length > 0 &&
                            <i className='fas fa-plus'></i>
                        }
                    </button>
                    {feature.subfeatures.length > 0 && renderSubFeaters &&
                        this.featureList(feature.subfeatures, depth + 1)
                    }
                </Fragment>
            );
        } else {
            var featureElem = (
                <Fragment>
                    <button className='button button-red block-mobile' onClick={() => this.handleListToggle(id, depth)}>
                        <span>{feature.title}</span>
                        {feature.subfeatures.length > 0 &&
                            <i className='fas fa-plus'></i>
                        }
                    </button>
                    {feature.subfeatures.length > 0 && renderSubFeaters &&
                        this.featureList(feature.subfeatures, depth + 1)
                    }
                </Fragment>
            );
        }

        return featureElem;
    }

    render() {
        return (
            <Fragment>
                <div className='section background-dark'>
                    <div className='container text-center'>
                        <h3 className='text-huge text-white text-with-subtitle'>Camp Silly Cone Valley</h3>
                    </div>
                </div>
                <br></br>
                <div className='container-medium'>
                    <img className='rounded-corners' src='app/static/hipcamp-camp.jpg'></img>
                    <div className='section'>
                        <div className='aligner-center-horitzontal aligner-center-vertical'>
                            <h3 className='text-medium text-white'>Camp Amenities</h3>
                        </div>
                    </div>
                    <div className='container-small'>
                        {this.featureList(this.state.features, 0)}
                    </div>
                </div>
            </Fragment>
        );
    }
}

ReactDOM.render(
    <CampFeatures />,
    document.getElementById('root')
)
