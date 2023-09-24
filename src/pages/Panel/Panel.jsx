import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProducts, deleteProduct, addProduct} from "../../redux/reducers/food";
import {getCategories, addCategory, deleteCategory} from "../../redux/reducers/categories";
import {getPromos, addPromo, deletePromo} from "../../redux/reducers/promos";
import {getOrders, deleteOrder, getCalls, deleteCall} from "../../redux/reducers/user";
import {Link, useNavigate} from "react-router-dom"
import {BsChevronLeft} from "react-icons/bs"

const Panel = () => {



    const navigate = useNavigate()

    const dispatch = useDispatch()
    const {list, filter, productID} = useSelector(store => store.productSlice)
    const {categs} = useSelector(store => store.categoriesSlice)
    const {promocodes} = useSelector(store => store.promosSlice)
    const {order, calls} = useSelector(store => store.userSlice)
    useEffect(() => {
        dispatch(getProducts(filter))
    },[filter])

    useEffect(() => {
        dispatch(getCategories())
    },[])

    useEffect(() => {
        dispatch(getPromos())
    },[])

    useEffect(() => {
        dispatch(getOrders())
    },[])

    useEffect(() => {
        dispatch(getCalls())
    },[])

    const [newPromo, setNewPromo] = useState({
        name: '',
        value: 0
    })

    const handlePromo = () => {
        dispatch(addPromo(newPromo))
        setNewPromo({
            name: '',
            value: 0
        })
    }

    const handleDelete = (productID) => {
        dispatch(deleteProduct(productID));
    }

    const handleDelOrd = (orderID) => {
        dispatch(deleteOrder(orderID));

    }

    const handleDelCall = (callID) => {
        dispatch(deleteCall(callID))
    }

    const handleDelPromo = (promoID) => {
        dispatch(deletePromo(promoID))
        console.log(promoID)
    }

    const [newCategory, setNewCategory] = useState({
        name: ''
    })

    const [newProduct, setNewProduct] = useState({
        title: '',
        category: '',
        price: 0,
        new: false,
        size: [
            "Маленький",
            "Средний",
            "Большой"
        ],
        width: [
            "Тонкое",
            "Традиционное"
        ],
        img: '',
        desc: "",
        adds: [

        ]
    })

    const handleCategory = () => {
        dispatch(addCategory(newCategory))
        setNewCategory({
            name: ''
        })
    }

    console.log(newCategory)

    const handleAdd = () => {
        dispatch(addProduct(newProduct))
        setNewProduct({
            title: '',
            category: '',
            price: 0,
            new: false,
            size: [
                "Маленький",
                "Средний",
                "Большой"
            ],
            width: [
                "Тонкое",
                "Традиционное"
            ],
            img: '',
            desc: "",
            adds: [

            ]
        })
    }

    return (
        <section className="panel">
            <div className="container">
                <h2 className="panel__title">Админ панель</h2>
                <div className="cart__end-left">
                    <BsChevronLeft/>
                    <Link to={`/`} className="cart__end-textt">Вернуться в магазин</Link>
                </div>
                <div className="panel__product">
                    <h3 className="panel__product-title">Products</h3>
                    <div className="panel__product-new">
                        <input value={newProduct.title} onChange={(e) => setNewProduct({...newProduct, title: e.target.value })} className="panel__product-new-input panel__product-new-input1" placeholder="title" type="text"/>
                        <input value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value })} className="panel__product-new-input" placeholder="price" type="number"/>
                        <input value={newProduct.desc} onChange={(e) => setNewProduct({...newProduct, desc: e.target.value })} className="panel__product-new-input" placeholder="desc" type="text"/>
                        <input value={newProduct.img} onChange={(e) => setNewProduct({...newProduct, img: e.target.value })} className="panel__product-new-input" placeholder="img" type="text"/>
                        <input value={newProduct.adds} onChange={(e) => setNewProduct({...newProduct, adds: e.target.value.split(",") })} className="panel__product-new-input" placeholder='adds "," ' type="text"/>
                        <select value={newProduct.size} onChange={(e) => setNewProduct({...newProduct, size: e.target.value.split(",") })} className="panel__product-new-input" placeholder="size" type="text">

                                <option selected value={["Маленький",
                                    "Средний",
                                    "Большой"]}>Раз.пиццы</option>
                                <option value={["Средний",
                                    "Большой"]}>Раз.другого</option>
                        </select>
                        <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value })} className="panel__product-new-input" placeholder="category">
                            <option selected>кат.никакая</option>
                            {
                                categs && categs.map(item => (
                                    <option>{item.name}</option>
                                ))

                            }
                        </select>
                        <select onChange={(e) => setNewProduct({...newProduct, new: e.target.value })} value={newProduct.new} className="panel__product-new-input" placeholder="new">
                            <option value={true}>new</option>
                            <option selected value={false}>not</option>
                        </select>
                        <button  onClick={() => {
                            handleAdd()

                        }}>add</button>
                    </div>
                </div>
                <ul className="panel__items">
                    {

                        list.map((item, idx) => (
                            <li key={item.id || idx + 1} className="panel__item">
                                <div className="panel__item-div">
                                    <p className="panel__item-title">{item.id}</p>
                                    <p className="panel__item-title">{item.title}</p>
                                </div>
                                <div className="panel__item-div">
                                    <p className="panel__item-title">{item.category}</p>
                                    <p className="panel__item-title">{item.price}</p>
                                </div>

                                <div className="panel__item-delete">
                                    <button onClick={() => {
                                        handleDelete(item.id)
                                    }} className="panel__item-delete-button">x</button>
                                </div>
                            </li>
                        ))
                    }

                </ul>
                <div className="panel__product">
                    <h3 className="panel__product-title">Categories</h3>
                    <div className="panel__product-new">
                        <input className="panel__product-new-input1" value={newCategory.name} onChange={(e) => setNewCategory({...newCategory, name: e.target.value})} placeholder={"категория"} type="text"/>
                        <button onClick={() => {
                            handleCategory()
                        }}>add</button>
                    </div>
                </div>
                <ul className="panel__items">
                    {
                        categs.map((item,idx) => (
                            <li key={item.id || idx} className="panel__item">{item.name}
                                <div className="panel__item-delete">
                                    <button onClick={() => {
                                        dispatch(deleteCategory(item.id))
                                    }} className="panel__item-delete-button">x</button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className="panel__product">
                    <h3 className="panel__product-title">Promocodes</h3>
                    <div className="panel__product-new">
                        <input className='panel__product-new-input1' value={newPromo.name} onChange={(e) => setNewPromo({...newPromo, name: e.target.value})} placeholder={"промокод"} type="text"/>
                        <input value={newPromo.value} onChange={(e) => setNewPromo({...newPromo, value: e.target.value})} placeholder={"скидка в %"} type="number"/>
                        <button onClick={() => {
                            handlePromo()
                        }}>add</button>
                    </div>
                </div>
                <ul className={promocodes.length > 0 ? "panel__items": "header__off"}>
                    {
                        promocodes.map((item,idx) => (
                            <li key={item.id || idx} className="panel__item">{item.name}
                                <div className="panel__item-delete">
                                    <button onClick={() => {
                                        handleDelPromo(item.id)
                                    }} className="panel__item-delete-button">x</button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className="panel__product">
                    <h3 className="panel__product-title">Orders</h3>
                </div>
                <ul className={order.length > 0 ? "panel__items": "header__off"}>
                    {
                        order.map((item,idx) => (
                            <li key={item.id || idx} className="panel__item">

                                <div className="panel__item-div">
                                    <p className="panel__item-title">{item.tel}</p>


                                    <p className="panel__item-title">{item.order.map(item => (
                                        <div className="panel__item-title-div">
                                            <span>{item?.title}</span>
                                            <span>{item?.size}</span>
                                            <span>{item?.width}</span>
                                            <span>{item.adds?.map(item => item)}</span>
                                        </div>



                                        )
                                    )}</p>


                                </div>
                                <div className="panel__item-div">
                                    <p className="panel__item-title">{item.address}</p>
                                    <p className="panel__item-title">{item.sum}</p>
                                </div>
                                <div className="panel__item-delete">
                                    <button onClick={() => {
                                        handleDelOrd(item.id)
                                        console.log(item.id)
                                    }} className="panel__item-delete-button">x</button>
                                </div>
                            </li>




                        ))
                    }
                </ul>
                <div className="panel__product">
                    <h3 className="panel__product-title">Calls</h3>
                </div>
                <ul className={calls.length > 0 ? "panel__items": "header__off"}>
                    {
                        calls.length > 0 ? calls.map((item,idx) => (
                            <li key={item.id || idx} className="panel__item">

                                <div className="panel__item-div">
                                    <p className="panel__item-title">{item.tel}</p>
                                    <p className="panel__item-title">{item.name}</p>
                                </div>
                                <div className="panel__item-delete">
                                    <button onClick={() => {
                                        handleDelCall(item.id)
                                        console.log(item.id)
                                    }} className="panel__item-delete-button">x</button>
                                </div>
                            </li>




                        )) : ''
                    }
                </ul>
            </div>
        </section>
    );
};

export default Panel;