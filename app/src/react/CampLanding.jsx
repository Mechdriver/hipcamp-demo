import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

require('sierra-library/dist/sierra.min.css');
require('../styles/campStyles.scss');

let FeatureList = require('./FeatureList.jsx');

class CampLanding extends Component {
    constructor(props) {
        super(props);

        //I'm assuming that a campsite will always have a list of features
        //so that the parent dropdown can always be expanded.
        this.state = {
            showAmenities: false,
            iconName: 'fas fa-plus'
        }
    }

    handleAmenitiesToggle() {
        let newShowAmenities = !this.state.showAmenities;
        let newIconName = newShowAmenities ? 'fas fa-minus' : 'fas fa-plus';

        this.setState({
            showAmenities: newShowAmenities,
            iconName: newIconName
        });
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
                    <div className='section'></div>
                    <div className='container-small'>
                        <button className='button block-mobile' onClick={() => this.handleAmenitiesToggle()}>
                            <span>Camp Amenities</span>
                            <i className={this.state.iconName}></i>
                        </button>
                        {this.state.showAmenities &&
                            <FeatureList />
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

ReactDOM.render(
    <CampLanding />,
    document.getElementById('root')
)
