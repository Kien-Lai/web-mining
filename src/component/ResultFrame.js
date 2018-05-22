import React, { Component } from 'react';
import './ResultFrame.css';
import ComeBack from 'react-icons/lib/fa/angle-double-left';

class ResultFrame extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        // this.open = this.open.bind(this);
    }

    render(){
        return(
            <div className={this.props.nameOfClass}>
                <ol className="result-rs">
                    {
                        this.props.C_cooked.map(e => <li key={e.value}>{e.name}</li>) 
                    }
                </ol>     
                <button onClick={this.props.click} className="comeback-btn-rs"><ComeBack className="come-back-rs"/>Trở lại</button>
            </div>
        )
    }
}

export default ResultFrame;