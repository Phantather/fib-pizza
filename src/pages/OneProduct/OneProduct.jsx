import React, {useEffect, useState} from 'react';
import pizza from "../../images/pizza.png";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../redux/reducers/food";
import {  useParams } from "react-router-dom";
import {getOneProduct} from "../../redux/reducers/oneProduct";
import {addCart} from "../../redux/reducers/user";
import without from "../../images/without.png"
import Pepper from "../../components/Pepper/Pepper";
import Sizes from "../../components/Sizes/Sizes";
import Doughs from "../../components/Doughs/Doughs";
const OneProduct = () => {

    const dispatch = useDispatch()
    const {id} = useParams()
    const [asf, setAsf] = useState(false)


    const {list} = useSelector(store => store.oneProductSlice)
    const [dough,setDough] = useState(false)

    const [sizes,setSizes] = useState(false)
    const [order, setOrder] = useState([])
    const changeColor = () => {
        setAsf(true)

        setTimeout(() => {
                setAsf(false)
            },1000)
    }

    useEffect(() => {
        dispatch(getOneProduct(id))

    },[id])
    useEffect(() => {
        setOrder({...list,adds:[]})
    },[list])

    return (
        <section className="oneProduct">
            <div className="container">
                <div className="oneProduct__row">
                    <div className="oneProduct__left">
                        <img src={list.img} alt=""/>
                    </div>
                    <div className="oneProduct__right">
                        <h1 className="oneProduct__title">{list.title}</h1>
                        <p className="oneProduct__desc">{list.desc}</p>
                        <div className="oneProduct__sizes">
                        {
                            list.size?.map(item => (
                                    <Sizes setSizes={setSizes} sizes={sizes} order={order} setOrder={setOrder} item={item}/>
                            ))
                        }
                        </div>

                        <div className="oneProduct__doughs">

                            {
                                list.category === "пицца" ? list?.width?.map(item => (
                                    <Doughs dough={dough} setDough={setDough}  order={order} setOrder={setOrder} item={item}/>
                                )) : ""
                            }

                        </div>
                        <div className="oneProduct__peppers">
                            {
                                list.adds?.map((item) => (
                                    <Pepper order={order} setOrder={setOrder} item={item}/>
                                ))
                            }



                        </div>
                        <div className={asf ?"oneProduct__btnd" : "oneProduct__btn"} onClick={() => {
                            if (asf) {

                            } else {
                                dispatch(addCart(order))
                                changeColor()
                            }

                        }}>Добавить в корзину</div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OneProduct;