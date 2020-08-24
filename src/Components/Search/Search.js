import React, { Component } from 'react';

import css from './Search.module.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dateDep: new Date(),
            dateRet: new Date(),
         }
    }
    render() { 
        return ( 
            <div className={css.DivSearch}>
            

            <div className={css.Tab}>
                <button>One Way</button>
                <button>Return</button>
            </div>

            <form className={css.FormSearch}>
                <input type='text' placeholder='Enter Origin City'></input>
                <input type='text' placeholder='Enter Destination City'></input>
                

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

        </div>
         );
    }
}
 
export default Search;