import React from "react";
import CSVReader from 'react-csv-reader'

const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header =>
        header
            .toLowerCase()
            .replace(/\W/g, '_')
};

class CSVUploaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.process = this.process.bind(this);
    }

    process(data) {
            this.props.dataProcessing(data);
    }

    render() {
        return (
            <div className="uploader__form">
                <label className={'upload'}>Upload file
                    <form>
                        <CSVReader
                            parserOptions={papaparseOptions}
                            onFileLoaded={data => this.process(data)}
                            accept = {'.csv'}
                        />
                    </form>
                </label>
            </div>
        )
    }
}

export default CSVUploaderComponent;