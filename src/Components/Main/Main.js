import React, { Component } from 'react';

import css from './Main.module.css';

import Search from '../Search/Search';
import Results from '../Results/Results'; 
import flights from '../../JSON/flights';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            resultArr: [],
            type: '',
            origin: '',
            destination: '',
            dateDep: '',
            dateRet: '',
            message: 'Enter Your Search.',
         }
    }

    searchCallback = (dataFromChild, type) => {

        if(type === 'oneWay'){

            this.setState({
                type: type,
            })

            let search = []

            flights.map(item => {

                if(item.origin.toLowerCase() === dataFromChild.origin.toLowerCase()
                    && item.destination.toLowerCase() === dataFromChild.destination.toLowerCase()
                    && item.date === dataFromChild.dateDep
                    && (item.price >= dataFromChild.val1 && item.price <= dataFromChild.val2)){

                    search.push(item);

                    this.setState({
                        origin: item.origin,
                        destination: item.destination,
                        dateDep: item.date,
                    })
                }
                return search;
            })

            if(Array.isArray(search) && search.length){

                this.setState({resultArr: [...search]});
            }
            else {
                this.setState({
                    resultArr: [],
                    message: 'No Results, please search again',
                })
            }
        }
        else if(type === 'twoWay'){

            this.setState({
                type: type,
                origin: dataFromChild.origin,
                destination: dataFromChild.destination,
                dateDep: dataFromChild.dateDep,
                dateRet: dataFromChild.dateRet
            })

            let twoWayArr = [];

            for(let i = 0; i < flights.length; i++){

                let going = {}

                if(flights[i].origin.toLowerCase() === dataFromChild.origin.toLowerCase()
                        && flights[i].destination.toLowerCase() === dataFromChild.destination.toLowerCase()
                        && flights[i].date === dataFromChild.dateDep
                        && (flights[i].price >= dataFromChild.val1 && flights[i].price <= dataFromChild.val2)){

                    going = {...flights[i]}

                    for(let j = i + 1; j < flights.length; j++){

                        let twoWayObj = {
                            going: going,
                            return: null,
                        }

                        if(flights[j].origin.toLowerCase() === dataFromChild.destination.toLowerCase()
                            && flights[j].destination.toLowerCase() === dataFromChild.origin.toLowerCase()
                            && flights[j].date === dataFromChild.dateRet
                            && (flights[j].price >= dataFromChild.val1 && flights[j].price <= dataFromChild.val2)){

                            twoWayObj.return = {...flights[j]}

                            twoWayArr.push(twoWayObj);
                        }
                    }
                }
            }

            if(Array.isArray(twoWayArr) && twoWayArr.length){

                this.setState({resultArr: [...twoWayArr]});
            }
            else {
                this.setState({
                    resultArr: [],
                    message: 'No Results, please search again',
                })
            }
    
        }

    }

    render() {

        return ( 
            <div className={css.DivMainContainer}>
                <Search searchCallback={this.searchCallback}/>
                <Results result={this.state.resultArr} type={this.state.type}
                    origin={this.state.origin} destination={this.state.destination}
                    dateDep={this.state.dateDep} dateRet={this.state.dateRet}
                    message={this.state.message}/>
            </div>
         );
    }
}
 
export default Main;