import React, {useState} from 'react';

const Sizes = ({item, order, setOrder,sizes, setSizes}) => {


    return (

            <button onClick={() => {
                setOrder({...order, size: item})
                setSizes(item)
            }} className={sizes === item ? "oneProduct__sizech" : "oneProduct__size"}>{item}</button>

    );
};

export default Sizes;