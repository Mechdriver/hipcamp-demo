import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

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
        //this.featureList();
    }

    loadFeatures() {
        fetch('camp-features/')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                features: data}
            );

            //console.log(data)
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
                            {feature.title}
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
                <div class="features">
                    {this.featureList(this.state.features)}
                </div>
            </Fragment>
        );
    }
}

ReactDOM.render(
    <CampFeatures />,
    document.getElementById('root')
)
