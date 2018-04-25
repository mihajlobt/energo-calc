import React from 'react';


class StageThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.parentState;
    };

    addSystem = (item, index) => {
        this.state.additionalSystemSelected.push(item);
        this.state.additionalSystem.splice(index, 1);
        this.state.totalInstallationCost = this.state.totalInstallationCost + item.price;
        this.props.updateSelectedSystems(this.state)
    };

    removeSystem = (item, index) => {
        this.state.additionalSystemSelected.splice(index, 1);
        this.state.additionalSystem.push(item);
        this.state.totalInstallationCost = this.state.totalInstallationCost - item.price;
        this.props.updateSelectedSystems(this.state)

    };


    render() {

        let systemType = this.state.additionalSystem.map((item, index) => (
            <div key={index}>
                <button onClick={this.addSystem.bind(this, item, index)} className="add-system-btn" key={index}>
                    {item.name}
                </button>
            </div>
        ));

        let selectedSystems = this.state.additionalSystemSelected.map((item, index)=>(
            <div key={index} className="selected-system">
                <div className="system-properties">
                    <span>{item.name}</span>
                    <span>{item.price} MKD</span>
                </div>
                <button className="delete-btn" onClick={this.removeSystem.bind(this, item, index)}>x</button>
            </div>
        ));

        return (
            <div className="main-container">
                <div className="system-list">
                    <div className="system-choice">
                        <div className="system-type">
                            {systemType}
                        </div>
                    </div>
                    <div className="system-choice">
                        <div className="selected-system-type">
                            {selectedSystems}
                        </div>
                    </div>
                </div>
                <div className="total-cost">
                    <span>Вкупно</span>
                    <span className="price">{this.state.totalInstallationCost} MKD</span>
                </div>
            </div>
        )
    }
}

export default StageThree;