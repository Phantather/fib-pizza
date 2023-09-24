import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom"
import logo from '../../../images/Rectangle 76.svg'
import yandex from '../../../images/yandex.png'
import dot from '../../../images/dot.svg'
import star from '../../../images/star.png'
import {useDispatch, useSelector} from "react-redux";
import {LogoutUser} from "../../../redux/reducers/user";
import {useNavigate} from "react-router-dom"
import {postCall} from "../../../redux/reducers/user";

const Header = () => {



    const email = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ''

    const userStorage = JSON.parse(localStorage.getItem("user"))
    const {user} = useSelector(store => store.userSlice)
    const dispatch = useDispatch()
    const {pathname} = useLocation()
    const navigate = useNavigate()

    const [popup, setPopup] = useState(false)

    const [accepted, setAccepted] = useState(false)

    const [name, setName] = useState('')

    const [call, setCall] = useState({
        name: '',
        tel: email?.user?.tel ? email?.user?.tel : ''
    })

    console.log(call)


    const handleName = (value) => {
        setCall({...call, name: value})
    }

    let cart = pathname !== '/cart' && pathname !== '/placing' && pathname !== '/ordered'
    return (
        <header className="header">
            <div className="container">
                {
                    cart ?
                        <>
                            <div className="header__row">
                                <div className="header__left">
                                    <Link className="header__link" to={'/'}><img className="header__logo" src={logo} alt=""/></Link>
                                    <div className="header__left-desc">
                                        <div className="header__up">Доставка пасты <span>Москва</span></div>
                                        <div className="header__down">
                                            <div className="header__down-left"><img src={yandex} alt=""/> Яндекс еда <img src={dot} alt=""/> 4.8 <img src={star} alt=""/></div>
                                            <div className="header__down-right">Время доставки <img src={dot} alt=""/> от 31 мин</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="header__right">
                                    <button onClick={() => setPopup(!popup)} className="header__btn">Заказать звонок</button>
                                    <h1 className='header__number'>8 499 391-84-49 </h1>
                                </div>
                            </div>
                            <div className="header__links">

                                <div className="header__links-right">
                                    {
                                        email?.user?.email === "sasas12@gmail.com" ?
                                            <Link  to={'/panel'} className="header__register">
                                                Админ панель
                                            </Link> : ""
                                    }

                                    {
                                        userStorage ?
                                        <p onClick={ () => {
                                            dispatch(LogoutUser)
                                            localStorage.removeItem('user')
                                            navigate('/register')
                                        }} className='header__register'>Выйти</p>
                                            :
                                            <Link to={'/register'} className="header__register">
                                                Войти
                                            </Link>
                                    }

                                    <Link className='header__btnLink'   to={'/cart'}>
                                        <button className='header__corz'>
                                            Корзина | {user.cart?.length ? user.cart?.length : 0}
                                        </button>
                                    </Link>
                                </div>



                            </div>
                        </>
                        :

                        <div className="header__basket">
                            <Link className="header__link" to={'/'}><img className="header__logo" src={logo} alt=""/></Link>
                            <div className="header__load">
                                <div className="header__load-up">
                                    <span onClick={() => navigate('/cart')} className={pathname === '/cart' ? "header__load-up-main" : "header__load-up-not"}     >1</span>
                                    <div className=""></div>
                                    <span onClick={() => user.cart.length ? navigate('/placing') : alert('добавьте заказ')} className={ pathname === '/placing' ? "header__load-up-main" : "header__load-up-not"}  >2</span>
                                    <div className=""></div>
                                    <span  className={ pathname === '/ordered' ? "header__load-up-main" : "header__load-up-not"}>3</span>
                                </div>
                                <div className="header__load-down">
                                    <p className="header__load-down-main">Корзина</p>
                                    <p className="header__load-down-not">Оформление заказа</p>
                                    <p className="header__load-down-not">Заказ принят</p>
                                </div>
                            </div>
                        </div>
                }
                <div className={popup ? "header__call" : "header__off"}>
                    <input onChange={(e) => {
                        handleName(e.target.value)
                    }} className="header__call-name" placeholder="Как к вам обращаться?" type="text"/>
                    <p className="header__call-desc">*Ваш телефон мы берем с данных аккаунта*</p>
                    <div className="header__call-btns">
                        <button onClick={() =>  {
                            dispatch(postCall(call))
                            setAccepted(true)
                            setTimeout(() => {
                                setPopup(!popup)
                                setAccepted(false)
                            },1000)

                        }} className={accepted ? "header__call-btn1" : "header__call-btn"}>Заказать звонок</button>
                    </div>

                </div>
                <div onClick={() => setPopup(!popup)} className={popup ? "header__background" : "header__off"}> </div>

            </div>
        </header>

    );
};

export default Header;