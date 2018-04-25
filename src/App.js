import React from 'react';
import StageOne from './components/StageOne.js'
import StageTwo from './components/StageTwo.js'
import StageThree from './components/StageThree.js'
import './styles/base.scss';


class App extends React.Component {
    constructor(props) {
        super(props);
        let yearlySystemExpense = 0.45,
            yearlySystemExpenseCoef = 2928;

        let systemType = [
            {
                name: "Сплит Систем (Клима Уред)",
                value: 3.5,
                price: "MKD 29.000",
                type: "Греење и ладење",
            },
            {
                name: "Печка на пелети",
                value: 10,
                price: "MKD 50.000",
                type: "Греење"
            },
            {
                name: "Котел на пелети",
                value: 10,
                price: "MKD 58.794",
                type: "Греење и загревање на вода"
            },
            {
                name: "Котел на гас(кондензациски)",
                value: 11,
                price: "MKD 70.848",
                type: "Греење и загревање на вода"
            },
            {
                name: "Котел на гас(атмосферски)",
                value: 11,
                price: "MKD 47.785",
                type: "Греење и загревање на вода"
            },
            {
                name: "Топлинска пумпа",
                value: 11.2,
                price: "MKD 389.787",
                type: "Греење, ладење и загревање на вода"
            },
        ];

        for (let i = 0; i < systemType.length; i++) {
            let type = systemType[i];
            type.expense = (type.value * yearlySystemExpense) * yearlySystemExpenseCoef;

            if (type.name === "Сплит Систем (Клима Уред)") {
                type.yearlyExpense = Math.round((type.expense * 0.67 * 5.68) + (type.expense * 0.3 * 2.78))
            } else if (type.name === "Печка на пелети") {
                type.yearlyExpense = Math.round(type.expense * 4)
            } else if (type.name === "Котел на пелети") {
                type.yearlyExpense = Math.round(type.expense * 4)
            } else if (type.name === "Котел на гас(кондензациски)") {
                type.yearlyExpense = Math.round((type.expense * 25) / 9)
            } else if (type.name === "Котел на гас(атмосферски)") {
                type.yearlyExpense = Math.round(((type.expense * 25) / 9))
            } else if (type.name === "Топлинска пумпа") {
                type.yearlyExpense = Math.round((((type.expense * 0.67 * 5.68) + (type.expense * 0.3 * 2.78)) / 3))
            }

            let price = type.price.match(/\d/g);
            price = price.join("");

            type.tenYearInvestment = parseInt(price) + parseInt((type.yearlyExpense * 10));
        }

        this.state = {
            view: 1,
            selectedSystemPower: null,
            systemType: systemType,
            minPower: 0,
            value: 0,
            additionalSystemSelected: [],
            additionalSystem: null,
            totalInstallationCost: 0
        };
    }


    nextStep = () => {
        this.state.view++;
        this.setState(this.state);
    };

    prevStep = () => {
        this.state.view--;
        this.setState(this.state);
    };

    setMinPower = (minPower, value) => {
        this.state.minPower = minPower;
        this.state.value = value;
        this.state.additionalSystem = [
            {name: "Подно греење", price: (16 * 61.5) * this.state.value},
            {name: "Радијаторско греење", price: (12 * 61.5) * this.state.value},
            {name: "Фенкојлерско ладење/греење", price: (20 * 61.5) * this.state.value},
            {name: "Радијаторско и подно греење", price: (28 * 61.5) * this.state.value},
            {name: "Фенокојлерско и подно", price: (33 * 61.5) * this.state.value}
        ];
        this.setState(this.state);

    };

    updateSelectedSystems = (state) => {
        this.setState(state);
    };

    render() {
        let stage;

        if (this.state.view === 1) {
            stage = (
                <StageOne parentState={this.state} updatePower={this.setMinPower}/>
            )
        } else if (this.state.view === 2) {
            stage = (
                <StageTwo parentState={this.state}/>
            )
        } else if (this.state.view === 3) {
            stage = (
                <StageThree updateSelectedSystems={this.updateSelectedSystems} parentState={this.state}/>
            )
        }

        let prevBtn = (<button onClick={this.prevStep} className="step-btn">Претходен чекор</button>);
        let nextBtn = (<button disabled={this.state.value === 0} onClick={this.nextStep} className="step-btn">Следен чекор</button>);

        return (
            <div>
                {stage}
                <div className="stage-controls">
                    {this.state.view !== 1 ? prevBtn : null}
                    {this.state.view > 2 ? null : nextBtn}
                </div>
            </div>
        )
    }
}

export default App;