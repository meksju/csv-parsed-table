import React from "react";

class DataRendererComponent extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="data__table">
                {
                    this.props.display && this.props.data && this.props.data.length > 0?
                    <table>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Full Name</th>
                            <th>Phone</th>
                            <th>E-Mail</th>
                            <th>Age</th>
                            <th>Experience</th>
                            <th>Yearly Income</th>
                            <th>Has Children</th>
                            <th>License State</th>
                            <th>Expiration Date</th>
                            <th>License No.</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.data.map((item, index) =>
                                <tr key={index}>
                                    <td>{item['id']}</td>
                                    <td style={item['full_name_style']}>{item['full_name']}</td>
                                    <td style={item['phone_style']}>{item['phone']}</td>
                                    <td style={item['email_style']}>{item['email']}</td>
                                    <td style={item['age_style']}>{item['age']}</td>
                                    <td style={item['experience_style']}>{item['experience']}</td>
                                    <td style={item['yearly_income_style']}>{item['yearly_income']}</td>
                                    <td style={item['has_children_style']}>{item['has_children']}</td>
                                    <td style={item['license_states_style']}>{item['license_states']}</td>
                                    <td style={item['expiration_date_style']}>{item['expiration_date']}</td>
                                    <td style={item['license_number_style']}>{item['license_number']}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table> :
                        <p>no valid data</p>
                }
            </div>
        )
    }
}

export default DataRendererComponent;