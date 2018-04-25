import React from 'react';


class StageTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.parentState
    };


    render() {
        let systemPower = this.state.systemType.map((item, index) => (
            <div className="system-type" key={index}>
                <div className="system-table-row name">{item.name}</div>
                <div className="system-table-row type">{item.type}</div>
                <div className="system-table-row value">{item.value}</div>
                <div className="system-table-row type">{item.type}</div>
                <div className="system-table-row">{item.price}</div>
                <div className="system-table-row yearly">{item.expense.toFixed(2)}kWh</div>
                <div className="system-table-row">{item.yearlyExpense}</div>
                <div className="system-table-row">MKD {item.tenYearInvestment}</div>
            </div>
        ));

        let tableNames = (
            <div className="system-type">
                <div className="system-table-row name">Систем</div>
                <div className="system-table-row">Погоден за</div>
                <div className="system-table-row">Mоќност</div>
                <div className="system-table-row">Погоден за</div>
                <div className="system-table-row">Цена</div>
                <div className="system-table-row yearly">Просечна годишна потрошувачка (16 часа греење на ден, 6 месеци)</div>
                <div className="system-table-row">Годишен трошок</div>
                <div className="system-table-row">10 години (инвестиција и трошок)</div>
            </div>
        );

        return (
            <div className="main-container">
                <div className="selected-properties">
                    <h1>Пресметка на трошок за опрема</h1>
                    <span className="properties">Минимална Моќност: {this.state.minPower}kWh - {this.state.value}[м2]</span>
                </div>
                <div className="system-table">
                    {tableNames}
                    {systemPower}
                </div>
            </div>
        )
    }
}

export default StageTwo;