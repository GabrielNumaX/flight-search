import React, { Component } from 'react';

import css from './Search.module.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

// import RangeSlider from '../RangeSlider/RangeSlider';

// import moment from 'moment';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            origin: '',
            destination: '',
            passengers: 1,
            dateDep: new Date(),
            dateRet: new Date(),
            val1: 0,
            val2: 20000,
            showReturn: false,
            search: {},
        }

        this.slider1 = React.createRef();
        this.slider2 = React.createRef();
    }


    handleDateDepart = (date) => {
    
        this.setState({
            dateDep: date
        })
    }

    handleDateReturn = (date) => {

        this.setState({
            dateRet: date
        })
    }

    updatePriceLabels = (e, slider) => { 

        let val1, val2;
      
        if (slider === 'one') {
            val1 = e.target.value;
            val2 = this.state.val2;    
        } 
        else if (slider === 'two') {
            val1 = this.state.val1;
            val2 = e.target.value;
        }

        val1 = parseInt(val1);
        val2 = parseInt(val2);
        
        if (val1 >= val2) { 

            console.log('val1 >= val2')

            this.setState({
                val1: val2 - 1000,
                val2: val2
            });
            return;
        } 
        else if (val2 <= val1) { 

            console.log('val2 <= val1')

            this.setState({
                val1: val1 + 1000,
                val2: val1,
            });
            
            return;
        } 
        else {
            this.setState({
                    val1: val1,
                    val2: val2
            });
        }
    }

    handleOneWay = (e) => {

        e.preventDefault();

        const searchObj = {
            origin: this.state.origin,
            destination: this.state.destination,
            passengers: this.state.passengers,
            dateDep: moment(this.state.dateDep).format('Do MMM yyyy'),
            val1: this.state.val1,
            val2: this.state.val2,
        }

        this.props.searchCallback(searchObj, 'oneWay');
    }

    handleTwoWay = (e) => {

        e.preventDefault();

        const searchObj = {
            origin: this.state.origin,
            destination: this.state.destination,
            passengers: this.state.passengers,
            dateDep: moment(this.state.dateDep).format('Do MMM yyyy'),
            dateRet: moment(this.state.dateRet).format('Do MMM yyyy'),
            val1: this.state.val1,
            val2: this.state.val2,
        }

        this.props.searchCallback(searchObj, 'twoWay');
    }

    render() { 

        return ( 
            <div className={css.DivSearch}>
            

                <div className={css.Tab}>
                    <button onClick={() => this.setState({showReturn: false})}>One Way</button>
                    <button onClick={() => this.setState({showReturn: true})}>Return</button>
                </div>

                {
                    this.state.showReturn
                    ?
                    <form className={css.FormSearchReturn} onSubmit={this.handleTwoWay}>
                        <input type='text' placeholder='Enter Origin City' 
                            value={this.state.origin}
                            onChange={(e) => this.setState({origin: e.target.value})}>
                        </input>
                        <input type='text' placeholder='Enter Destination City'
                            value={this.state.destination}
                            onChange={(e) => this.setState({destination: e.target.value})}>
                        </input>
                        

                        <div className={css.FormDiv}>
                            <label>Departure Date</label>
                            <DatePicker
                                selected={this.state.dateDep} 
                                onChange={this.handleDateDepart}/>
                                
                        </div>

                        <div className={css.FormDiv}>
                            <label>Return Date</label>
                            <DatePicker
                                selected={this.state.dateRet} 
                                onChange={this.handleDateReturn}/>
                        </div>
                    
                        <div className={css.FormDiv}>
                            <label>Passengers</label>
                            <select>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                            </select>
                        </div>

                        <div className={css.FormInput}>
                            <input type='submit' value='Search'></input>
                        </div>
                        
                    </form>
                :
                    <form className={css.FormSearch} onSubmit={this.handleOneWay}>

                        <input type='text' placeholder='Enter Origin City'
                            value={this.state.origin}
                            onChange={(e) => this.setState({origin: e.target.value})}>
                        </input> 

                        <input type='text' placeholder='Enter Destination City'
                            value={this.state.destination}
                            onChange={(e) => this.setState({destination: e.target.value})}>
                        </input>                  

                        <div className={css.FormDiv}>
                            <label>Departure Date</label>
                            <DatePicker
                                selected={this.state.dateDep} 
                                onChange={this.handleDateDepart}/>
                        </div>
                    
                        <div className={css.FormDiv}>
                            <label>Passengers</label>
                            <select value={this.state.passengers} 
                                onChange={(e) => this.setState({passengers: e.target.value})}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                            </select>
                        </div>

                        <div className={css.FormInput}>
                            <input type='submit' value='Search'></input>
                        </div>
                        
                    </form>

                }

                <div className={css.PriceSlider}>

                    <p>{this.state.val1} - {this.state.val2}</p>
                    <input ref={this.slider1} 
                        value={this.state.val1} 
                        min="0" max="20000" step="1000" 
                        type="range" 
                        onChange={(e) => this.updatePriceLabels(e, 'one')}>
                        
                    </input>
                    <input ref={this.slider2} 
                        value={this.state.val2} 
                        min="0" max="20000" step="1000" 
                        type="range" 
                        onChange={(e) => this.updatePriceLabels(e, 'two')}>

                    </input>
                    
                </div>

            </div>
        );
    }
}
 
export default Search;