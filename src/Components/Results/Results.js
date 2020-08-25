import React from 'react';

import css from './Results.module.css';

const Results = (props) => {

    let arrayCheck = false;

    if(Array.isArray(props.result) && props.result.length){

        arrayCheck = true;
    }

    console.log(props.result);
    console.log(props.type);
    return (
        <div className={css.DivResults}>

            {
                arrayCheck 
                ?
                (props.type === 'oneWay'
                ?
                <div className={css.DivCity}>
                    <h2>{props.origin} - {props.destination}</h2>

                    <div className={css.DivDates}>
                        <p>Depart: {props.dateDep}</p>
                    </div>
                </div>
                :
                props.type === 'twoWay'
                ?
                <div className={css.DivCity}>
                    <h2>{props.origin} - {props.destination} - {props.origin}</h2>

                    <div className={css.DivDates}>
                        <p>Depart: {props.dateDep}</p>
                        <p>Return: {props.dateRet}</p>
                    </div>
                </div>
                :
                <div className={css.DivCity}>
                    <h2>{props.message}</h2>
                </div>)
                :   
                <div className={css.DivCity}>
                    <h2>{props.message}</h2>
                </div>          
            }

            <div className={css.ResultItemContainer}>

                {
                    props.type === 'oneWay'
                    ?
                    props.result.map((item, pos) => {

                        return(
                            <div className={css.ResultItem} key={pos}>
                                <h3>Rs. {item.price}</h3>

                                <div className={css.ResultRow}>

                                    <div className={css.Result}>
                                        <h4>{item.origin} - {item.destination}</h4>
                                        <p>Depart: {item.depart}</p>
                                        <p>Arrive: {item.arrive}</p>
                                    </div>

                                    <div className={css.ResultBtn}>
                                        <button onClick={() => alert('Your Flight has been booked')}>Book This Flight</button>
                                    </div>

                                </div>
                            </div>
                        )
                    })

                    :

                    (props.type === 'twoWay'
                    ?

                    props.result.map((item, pos) => {

                        console.log('twoWay');

                        return(
                            <div className={css.ResultItem} key={pos}>
                                <h3>Rs. {item.going.price}</h3>

                                <div className={css.ResultRow}>

                                    <div className={css.Result}>
                                    <h4>{item.going.origin} - {item.going.destination}</h4>
                                    <p>Depart: {item.going.depart}</p>
                                    <p>Arrive: {item.going.arrive}</p>
                                    </div>

                                    <div className={css.Result}>
                                    <h4>{item.return.origin} - {item.return.destination}</h4>
                                    <p>Depart: {item.return.depart}</p>
                                    <p>Arrive: {item.return.arrive}</p>
                                    </div>


                                    <div className={css.ResultBtn}>
                                    
                                        <button onClick={() => alert('Your Flight has been booked')}>Book This Flight</button>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                    :
                    null
                    )
                }
            </div>
        </div>
    );
}
 
export default Results;
