import React, {useEffect, useState} from 'react';
import { Navigation} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from "react-router-dom"
import 'swiper/css';
import 'swiper/css/navigation';
import pizza from "../../images/pizza.png"
import close from "../../images/close.svg"
import {BsChevronLeft} from "react-icons/bs"
import {FaChevronRight} from "react-icons/fa"
import {useSelector, useDispatch} from "react-redux";
import {deleteCart} from "../../redux/reducers/user"
import {getPromos} from "../../redux/reducers/promos";
import {useNavigate} from "react-router-dom"

const Cart = () => {


    const navigate = useNavigate()

    const {user} = useSelector(store => store.userSlice)
    const {promocodes} = useSelector(store => store.promosSlice)
    const dispatch = useDispatch()

    const arr = promocodes.map(item => item.name)

    const sumArr = user.cart?.map((item) => {
        return item && item.price && item.count ?
             [parseInt(item.price), parseInt(item.count)]
            : [0, 0];
    });

    const sum =  sumArr && sumArr.length ?
        sumArr.reduce((acc, rec) => {
                return acc + (+rec[0] * +rec[1])
            },0)
            : 0;

    useEffect(() => {
       dispatch(getPromos())
    },[])



    return (
        <section className="cart">
            <div className="container">
                <div className="cart__row">
                    <h1 className="cart__title">
                        Корзина
                    </h1>
                    <div className="cart__orders">
                        {
                            user.cart?.map(item => (
                                <div key={item.id} className="cart__order">
                                    <img className="cart__order-img" src={item.img} alt=""/>
                                    <div className="cart__order-text">
                                        <h2 className="cart__order-title">{item.title}</h2>
                                        <p className="cart__order-desc">{item.width}, {item.size} , {item.adds.map(item => `${item} `)}</p>
                                    </div>
                                    <h2 className="cart__order-price">{item.price}</h2>
                                    <div className="cart__order-count">
                                        {/*<span className="cart__order-plus">-</span>*/}
                                        <span className="cart__order-number">{item.count} шт.</span>
                                        {/*<span className="cart__order-plus">+</span>*/}
                                    </div>
                                    <img onClick={() => dispatch(deleteCart(item))} className="cart__order-close" src={close} alt=""/>
                                </div>
                            ))
                        }

                    </div>
                    <div className="cart__promo">
                        <p className="cart__promo-price">Сумма заказа: <span>{sum}₽</span></p>
                    </div>
                    <div className="cart__end">
                        <div className="cart__end-left">
                            <BsChevronLeft/>
                            <Link to={`/`} className="cart__end-text">Вернуться в магазин</Link>
                        </div>

                        <button onClick={() => sum ? navigate('/placing') : alert('добавьте заказ')} className="cart__end-right">Оформить заказ <FaChevronRight/></button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Cart;