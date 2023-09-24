import React from 'react';
import ordered from "../../images/ordered.png"
import {useNavigate} from "react-router-dom"

const Ordered = () => {

    const navigate = useNavigate()

    return (
        <section className="ordered">
            <div className="container">
                <div className="ordered__row">
                    <img  onClick={() => navigate('/')} src={ordered} alt="Заказ принят"/>
                    <h3 onClick={() => navigate('/')} className="ordered__title">Вернуться на главную</h3>
                </div>
            </div>
        </section>
    );
};

export default Ordered;