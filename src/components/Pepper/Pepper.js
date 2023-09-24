import React, {useState} from 'react';
import without from "../../images/without.png";
import with1 from "../../images/with.png";

const Pepper = ({item,  order, setOrder}) => {

    // const [active,setActive] = useState()
    // adds ? () => setOrder({...order, adds: [...order.adds, item]}) : setOrder(order)
    const handlerChange = (e) => {
        order?.adds?.find((el) => el === e.target.value) ? setOrder({...order,adds:order.adds.filter((item => item !== e.target.value))}) :setOrder({...order,adds:[...order?.adds,e.target.value]})

    }
    // console.log(order)
    return (


            <div className="oneProduct__pepper">

                <label className="oneProduct__label">
                    <input value={item} onChange={handlerChange} type="checkbox"/>
                    {
                        order?.adds?.find((el) => el === item ) ?  <img className="oneProduct__pepper-img" src={with1} alt=""/> : <img className="oneProduct__pepper-img" src={without} alt=""/>
                    }



                </label>

                <h3 className="oneProduct__pepper-name">{item}</h3>
            </div>
    );
};

export default Pepper;