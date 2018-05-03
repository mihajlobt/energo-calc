import React from 'react';


class StageOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.parentState.value,
            minPower: props.parentState.minPower,
            isolationTypes: [
                {name: "Одлична", value: 0.5},
                {name: "Просечна", value: 0.7},
                {name: "Лоша", value: 1}
            ],
            selectedIsoType: 0.5,
        }
    };


    selectIsoType = event => {
        this.state.selectedIsoType = Number(event.target.value);
        this.calculateResult()
    };

    setValue = (e) => {
        this.state.value = Number(e.target.value);
        this.calculateResult();
    };

    calculateResult = () => {
        let isoType = this.state.selectedIsoType,
            sqValue = this.state.value,
            coeficient = 0.12;

        this.state.minPower = Math.round(sqValue * coeficient * isoType);
        this.props.updatePower(Math.round(sqValue * coeficient * isoType), sqValue);
    };

    render() {
        const isoTypes = this.state.isolationTypes.map((item, index) => (
            <option value={item.value} key={index}>{item.name}</option>
        ));

        return (
            <div className="main-container">
                <div className="user-input">
                    <label htmlFor="sqValue">Корисна грејна вадратура на објектот [м2]</label>
                    <input defaultValue={this.state.value} id="sqValue" onChange={this.setValue}/>
                </div>
                <div className="user-input">
                    <label htmlFor="isoValue">Квалитет на термичка изолација</label>
                    <select id="isoValue" onChange={this.selectIsoType}>
                        {isoTypes}
                    </select>
                </div>
                <div className="calc-result">
                    <span>минималната моќност: {this.state.minPower}kw</span>
                </div>
                <span className="next-step-text">За зададената квадратура во следниот чекор  е потребно да одберете уред со минимална моќност</span>
            </div>
        )
    }
}

export default StageOne;