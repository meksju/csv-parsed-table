import React from "react";
import CSVUploaderComponent from "./CSVUploaderComponent";
import DataRendererComponent from "./DataRendererComponent";

class App extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            display: true
        };
        this.setData = this.setData.bind(this);
    }

    setData(data) {
        if (data && data.length > 0) {
            data.forEach((item, index) => {
                this.removeSpaces(item);
                item['id'] = index+1;
                this.isFilled(item['full_name']);
                this.isFilled(item['phone']);
                item['phone_style'] = this.dataValidator(
                    /^(\d{10})$/.test(item['phone'])
                    || /^(1|)?(\d{10})$/.test(item['phone'])
                    || /^(\+)(1|)?(\d{10})$/.test(item['phone']));
                item['phone'] = this.checkPhone(item['phone'].toString());
                this.isFilled(item['email']);
                item['email_style'] = this.dataValidator(/\S+@\S+\.\S+/.test(item['email'].toLowerCase()));
                item['age_style'] = this.dataValidator(item['age'] > 21 && Number.isInteger(item['age']));
                item['experience_style'] = this.dataValidator(item['experience'] >= 0 && item['experience'] < item['age']);
                item['yearly_income_style'] = this.dataValidator(item['yearly_income'] < 1000000
                    && typeof item['yearly_income'] === 'number' && item['yearly_income'] > 0);
                item['yearly_income'] = (parseFloat(item['yearly_income'])).toFixed(2);
                item['has_children_style'] = this.dataValidator(item['has_children'] === true || item['has_children'] === null);
                item['has_children'] = this.checkChildren(item['has_children']);
                let states = this.statesList(item['license_states']);
                item['license_states'] = states;
                if(states === "undefined"){
                    item['license_states'] = '';
                    item['license_states_style'] = this.dataValidator();
                }
                item['expiration_date_style'] = this.dataValidator(/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(item['expiration_date'])
                    || /^\d{4}-\d{2}-\d{2}$/.test(item['expiration_date']));
                 item['license_number_style'] = this.dataValidator(item['license_number'].length === 6 &&
                    /^[0-9a-zA-Z]+$/.test(item['license_number']));
            });
        }
        this.setState({data});
    }

    isFilled(value) {
        if (!value) {
            this.setState({display: value});
            alert("Please provide your data");
        }
    }
    checkPhone(value) {
        if(/^\d{10}$/.test(value)){
            return `+1${value}`;
        }
        else if(/^(1|)?(\d{10})$/.test(value)){
            return `+${value}`;
        }else{
            return value;
        }
    }
    dataValidator(cond) {
        return cond ? {background: 'none'} : {background: '#ffcef1'};
    }

    removeSpaces(value){
       return value.toString().trim();
    }
    checkChildren(value){
        if (value === true) {
            return 'yes';
        } else if (value === null) {
           return 'no';
        }else{
            return value;
        }
    }
    statesList(value) {
        let result = value.split(',');
        let states = {
            "Alabama": "AL",
            "Alaska": "AK",
            "Arizona": "AZ",
            "Arkansas": "AR",
            "California": "CA",
            "Colorado": "CO",
            "Connecticut": "CT",
            "Delaware": "DE",
            "District Of Columbia": "DC",
            "Florida": "FL",
            "Georgia": "GA",
            "Hawaii": "HI",
            "Idaho": "ID",
            "Illinois": "IL",
            "Indiana": "IN",
            "Iowa": "IA",
            "Kansas": "KS",
            "Kentucky": "KY",
            "Louisiana": "LA",
            "Maine": "ME",
            "Maryland": "MD",
            "Massachusetts": "MA",
            "Michigan": "MI",
            "Minnesota": "MN",
            "Mississippi": "MS",
            "Missouri": "MO",
            "Montana": "MT",
            "Nebraska": "NE",
            "Nevada": "NV",
            "New Hampshire": "NH",
            "New Jersey": "NJ",
            "New Mexico": "NM",
            "New York": "NY",
            "North Carolina": "NC",
            "North Dakota": "ND",
            "Ohio": "OH",
            "Oklahoma": "OK",
            "Oregon": "OR",
            "Pennsylvania": "PA",
            "Rhode Island": "RI",
            "South Carolina": "SC",
            "South Dakota": "SD",
            "Tennessee": "TN",
            "Texas": "TX",
            "Utah": "UT",
            "Vermont": "VT",
            "Virginia": "VA",
            "Washington": "WA",
            "West Virginia": "WV",
            "Wisconsin": "WI",
            "Wyoming": "WY"
        };
        if (Array.isArray(result)) {
            let answer = '';
            result.forEach((item, index) => {
                item = item.replace(/\s/g, '');
                if (index > 0) {
                    answer += ' | ' + states[item];
                } else {
                    answer += states[item];
                }
            });
            return answer;
        }
        return states[value];
    }

    render() {
        return (
            <div className="container">
                <CSVUploaderComponent dataProcessing={this.setData}/>
                <DataRendererComponent display={this.state.display} data={this.state.data || []}/>
            </div>
        )
    }
}

export default App;
