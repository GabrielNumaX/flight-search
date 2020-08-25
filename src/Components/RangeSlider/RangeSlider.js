import React, { Component } from 'react';

import css from './RangeSlider.module.css';

class RangeSlider extends Component {

    constructor() {
    super();
        this.state = { 
            val1: 0,
            val2: 20000
        }

        this.slider1 = React.createRef();
        this.slider2 = React.createRef();
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
    
    render() {
        return (
            <div className={css.PriceSlider}>

                <p>{this.state.val1} - {this.state.val2}</p>
                <input ref={this.slider1} 
                    value={this.state.val1} 
                    min="0" max="20000" step="1000" 
                    type="range" 
                    onChange={(e) => this.updatePriceLabels(e, 'one')}></input>
                <input ref={this.slider2} 
                    value={this.state.val2} 
                    min="0" max="20000" step="1000" 
                    type="range" 
                    onChange={(e) => this.updatePriceLabels(e, 'two')}></input>
                    
            </div>
        
        )
    }
}
    
export default RangeSlider;