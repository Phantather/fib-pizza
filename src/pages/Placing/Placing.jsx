import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteCart} from "../../redux/reducers/user";
import close from "../../images/close.svg";
import {useNavigate} from "react-router-dom";
import {getPromos} from "../../redux/reducers/promos";
import {postOrders} from "../../redux/reducers/user";
import {FaChevronRight} from "react-icons/fa"


const Placing = () => {
    const {user} = useSelector(store => store.userSlice)
    const navigate = useNavigate()

    const phone = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ''
    const sumArr = user.cart?.map(item => {
        return item.price
    })

    let sum = sumArr.length ? sumArr.reduce((acc,rec) => {
        return acc + rec
    }) : 0

    const [pro,setPro] = useState({});
    const PromoSum =  pro.value ? Math.floor(sum * ((100 - pro.value  ) * 0.01) )  : sum



    const {promocodes} = useSelector(store => store.promosSlice)






    const [address, setAddress] = useState("")

    const [promoValue, setPromoValue] = useState("")



    const checkPromo = (e) => {
        e.preventDefault();
        setPro(promocodes.find(item => item.name === e.target[0].value))

    }


    const arr = promocodes.map(item => item.name)

    useEffect(() => {
        dispatch(getPromos())
    },[])

    const [order, setOrder] = useState({
        tel: phone.user.tel,
        address: '',
        order: user.cart?.map(item => item),
        sum: 0
    })

    const dispatch = useDispatch()

    useEffect(() => {
        setOrder({ ...order, sum: PromoSum });
    }, [PromoSum]);

    const handleChange = (address) => {
        setOrder({...order , "address": address})
    }

    return (
        <section className="placing">
            <div className="container">
                <div className="placing__row">
                    <div className="placing__left">
                        {
                            user.cart?.map(item => (
                                <div key={item.id} className="cart__order">
                                    <img className="cart__order-img" src={item.img} alt=""/>
                                    <div className="cart__order-text">
                                        <h2 className="cart__order-title">{item.title}</h2>
                                        <p className="cart__order-desc">{item.width}</p>
                                    </div>
                                    <h2 className="cart__order-price">{item.price}</h2>
                                    <div className="cart__order-count">
                                        <span className="cart__order-number">1</span>
                                    </div>
                                    <img onClick={() => dispatch(deleteCart(item))} className="cart__order-close" src={close} alt=""/>
                                </div>
                            ))
                        }
                    </div>
                    <div className="placing__right">
                        <div className="placing__promo">
                            <form  className="cart__form">
                                <input onChange={(e) => {
                                    setAddress(e.target.value)
                                    handleChange(address)
                                }} placeholder="Адрес" type="text"/>
                            </form>
                            <form onSubmit={(e) => {
                                checkPromo(e,promoValue)
                            }} className="cart__form">
                                <input value={promoValue} onChange={(e) => {
                                    setPromoValue(e.target.value)
                                }} type="text" placeholder="Введите промокод"/>
                                <button className="cart-form-btn" type="submit" >Применить</button>
                            </form>
                            <p className="cart__promo-price">Сумма заказа: <span>{PromoSum}₽</span></p>
                            <button onClick={() => {
                                dispatch(postOrders(order))
                                navigate('/ordered')
                            }} className="cart__end-right">Заказать <FaChevronRight/></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Placing;