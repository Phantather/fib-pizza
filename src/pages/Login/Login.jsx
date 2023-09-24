import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {BsChevronLeft} from "react-icons/bs"
import axios from "axios";
import {useDispatch} from "react-redux";
import {LoginUser} from "../../redux/reducers/user";

const Login = () => {

    const [password, setPassword] = useState(true)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const registerUser = (user) => {
        axios.post('http://localhost:4444/login', user)
            .then(({data}) => {
                dispatch(LoginUser(data))
                localStorage.setItem("user",JSON.stringify(data))
                navigate(`/`)

            })

            .catch((err) => alert(err))
    }

    const handlerChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        registerUser(user)
    }


    return (
        <section className="register">
            <div className="register__yellow"></div>
            <div className="container">
                <div className="register__row">
                    <h1 className="register__title">Вход</h1>
                    <form onSubmit={onSubmit} className="register__form">
                        <input onChange={handlerChange} required name={"email"} className="register__input" placeholder="Почта" type="email"/>
                        <input onChange={handlerChange} required name={"password"} className="register__input" placeholder="Пароль" type={password ? "password" : "text"}/>
                        <label className="register__showp">
                            <input onClick={() => setPassword(!password)} type="checkbox" className="register__showch"/>
                            <span className="register__pok">Показать пароль</span>
                        </label>
                        <button type="submit" >Продолжить</button>
                    </form>
                    <div className="register__voiti">
                        <Link className="register__link" to={`/register`}>Нет аккаунта?</Link>
                    </div>
                    <div className="cart__end-left">
                        <BsChevronLeft/>
                        <Link to={`/`} className="cart__end-text">Вернуться в магазин</Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Login;