import React, {useState} from 'react';

const Doughs = ({item, order, setOrder, dough,setDough}) => {

    return (
        <button onClick={() => {
            setOrder({...order, width: item})
            setDough(item)

        }} className={`${dough === item ? "oneProduct__doughh" : "oneProduct__dough"}`}  >{item}</button>
    );
};

export default Doughs;