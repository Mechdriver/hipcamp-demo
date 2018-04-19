import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

require('sierra-library/dist/sierra.min.css');
require('../styles/campStyles.scss');

class CampFeatures extends Component {
    constructor(props) {
        super(props);

        this.state = {
            features: []
        };

        this.loadFeatures = this.loadFeatures.bind(this);
        this.featureList = this.featureList.bind(this);
    }

    componentDidMount() {
        this.loadFeatures();
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

    featureList(features) {
        if (!features.length) {
            return null;
        }

        return (
            <ul>
                {features.map((feature, ndx) => {
                    return (
                        <li key={ndx}>
                            <button className='button block-mobile'>
                                <span>{feature.title}</span>
                            </button>
                            {this.featureList(feature.subfeatures)}
                        </li>
                    );
                })}
            </ul>
        );
    }

    render() {
        return (
            <Fragment>
                <div className='section background-dark'>
                    <div className='container text-center'>
                        <h3 className='text-huge text-white text-with-subtitle'>Camp Silly Cone Vallée</h3>
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
                        {this.featureList(this.state.features)}
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
