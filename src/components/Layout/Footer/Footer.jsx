import React, {useState} from 'react';
import logo from '../../../images/Rectangle 76.svg'
import icon1 from '../../../images/image 17.png'
import icon2 from '../../../images/image 18.png'
import icon3 from '../../../images/image 19.png'
import icon4 from '../../../images/image 20.png'
import icon5 from '../../../images/image 21.png'
import icon6 from '../../../images/image 22.png'
import {Link} from "react-router-dom";
import {postCall} from "../../../redux/reducers/user";
import {useDispatch} from "react-redux";

const Footer = () => {


    const [popup, setPopup] = useState(false)

    const [accepted, setAccepted] = useState(false)

    const [name, setName] = useState('')

    const email = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ''

    const [call, setCall] = useState({
        name: '',
        tel:  email?.user?.tel ? email?.user?.tel : ''
    })

    console.log(call)


    const handleName = (value) => {
        setCall({...call, name: value})
    }


    const dispatch = useDispatch()

    return (

        <footer className="footer">
            <div className="container">
                <div onClick={() => setPopup(!popup)} className={popup ? "header__background" : "header__off"}> </div>
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
                <div className="footer__row">
                    <div className="footer__left">
                        <img src={logo} alt=""/>
                        <div className="footer__info">
                            <p className="footer__infos">Калорийность и состав</p>
                            <p className="footer__infos">Правовая информация</p>
                        </div>
                        <p className="footer__miv">Мы в соцсетях</p>
                        <div className="footer__social">

                            <div className="footer__card">
                                <a href="https://www.youtube.com/watch?v=hvL1339luv0" className='footer__card-names'>YouTube</a>
                                <a href="https://www.youtube.com/watch?v=hvL1339luv0" className='footer__card-names'>Instagram</a>
                            </div>
                            <div className="footer__card">
                                <a href="https://www.youtube.com/watch?v=hvL1339luv0" className='footer__card-names'>Facebook</a>
                                <a href="https://www.youtube.com/watch?v=hvL1339luv0" className='footer__card-names'>ВКонтакте</a>
                            </div>
                            <div className="footer__card">
                                <a href="https://www.youtube.com/watch?v=hvL1339luv0" className='footer__card-names'>Москва ул. Проспект </a>
                                <a href="https://www.youtube.com/watch?v=hvL1339luv0" className='footer__card-names'>Вернадского 86В</a>
                            </div>

                        </div>
                        <p className="footer__yabao">YaBao Все праав защищены © 2021</p>
                    </div>
                    <div className="footer__right">
                        <h1 className="footer__title">
                            Остались вопросы? А мы всегда на связи:
                        </h1>
                        <div className="footer__icons">
                            <a href="https://www.youtube.com/watch?v=hvL1339luv0" className="footer__icon"><img src={icon1} alt=""/></a>
                            <a href="https://www.youtube.com/watch?v=hvL1339luv0" className="footer__icon"><img src={icon2} alt=""/></a>
                            <a href="https://www.youtube.com/watch?v=hvL1339luv0" className="footer__icon"><img src={icon3} alt=""/></a>
                            <a href="https://www.youtube.com/watch?v=hvL1339luv0" className="footer__icon"><img src={icon4} alt=""/></a>
                            <a href="https://www.youtube.com/watch?v=hvL1339luv0" className="footer__icon"><img src={icon5} alt=""/></a>
                            <a href="https://www.youtube.com/watch?v=hvL1339luv0" className="footer__icon"><img src={icon6} alt=""/></a>
                            <a href="https://www.youtube.com/watch?v=hvL1339luv0" className="footer__icon">Написать нам</a>
                        </div>
                        <h1 className='footer__number'>8 499 391-84-49 </h1>
                        <Link className='header__btnLink'>
                            <button onClick={() => setPopup(!popup)} className="footer__btn">Заказать звонок</button>
                        </Link>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;