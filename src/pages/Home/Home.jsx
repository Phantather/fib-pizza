import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, EffectCoverflow } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import image1 from '../../images/image 31.png';
import image2 from '../../images/image 5.png';
import akcii from '../../images/akcii.png';
import {getProducts, changeCat} from "../../redux/reducers/food";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {getCategories} from "../../redux/reducers/categories";
import arrow from "../../images/r-l.svg"
import {changeLimit} from "../../redux/reducers/food";
import {useNavigate} from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()


    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const {list, filter, limit} = useSelector(store => store.productSlice)
    const {categs} = useSelector(store => store.categoriesSlice)
    let coteg = Array.from(new Set(list.map(item => item.category)))
    const getUser  = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""
    useEffect(() => {
       dispatch(getProducts(filter))
       dispatch(getCategories())
    },[filter])

    // console.log(getUser)

    const news = list.filter((item,idx) => {
        if (item.new) {
            return idx <= 10
        }
    })

    const max = list.length

    const breakpoints = {
        1116: {
            slidesPerView: 2,
            centeredSlides: false
        }
    }

    return (
        <section className="home">
            <div className="container">
                <div className="home__swiper">
                    <Swiper
                        breakpoints = {breakpoints}
                        modules={[Navigation, Pagination, Scrollbar, EffectCoverflow]}
                        grabCursor={true}
                        spaceBetween={10}
                        slidesPerView={1}
                        centeredSlides={true}
                        onSlideChange={() => console.log('slide change')}
                        effect={'coverflow'}
                        navigation
                        coverflowEffect={
                          {
                              rotate: 0,
                              stretch: 0,
                              depth: 100,
                              modifier: 2.5,
                              slideShadows: false
                            }
                        }
                    >
                        <SwiperSlide><img src={image1} alt=""/></SwiperSlide>
                        <SwiperSlide><img src={image2} alt=""/></SwiperSlide>
                        <SwiperSlide><img src={image1} alt=""/></SwiperSlide>
                        <SwiperSlide><img src={image2} alt=""/></SwiperSlide>
                    </Swiper>
                </div>
                <h2 className="home__nov">Новинки</h2>
                <div className="home__novinki">

                    {
                        news.map((item) => (
                            item.new ?
                            <div key={item.id} className="miniCard">
                                <img src={item.img} alt=""/>
                                <Link to={`${getUser.user ? `/product/${item.id}` : "/register"}`} className="miniCard__right">
                                    <h2 className="miniCard__name">{item.title}</h2>
                                    <p className="miniCard__desc">{item.price}₽</p>
                                </Link>
                            </div> : ""
                        ))
                    }



                </div>
                <div className="home__filter">
                    <p className="home__type">Категории:</p>
                    <div className="home__filterr">
                        <p onClick={() => {
                            dispatch(changeCat(0))
                        }} className="home__type">Всё</p>
                        {
                            categs.map((item,idx) => (
                                <p key={item.id || idx}  onClick={() => {
                                    dispatch(changeCat(item.name))
                                    console.log(item)
                                }} className="home__type">{item.name}</p>
                            ))
                        }
                    </div>

                </div>
                <div className="home__catalog">
                    {
                        list.slice(0,limit).map((item) => (
                            <div key={item.id} className="home__card">
                                <img src={item.img} alt=""  />
                                <Link to={`${getUser.user ? `/product/${item.id}` : "/register"}`} className="home__card-title">{item.title}</Link>
                                <Link to={`${getUser.user ? `/product/${item.id}` : "/register"}`} className="home__card-desc">{item.desc}</Link>
                                <div className="home__card-down">
                                    <h2 className="home__card-price">{item.price}₽</h2>
                                    <button className="home__card-btn"><Link className="home__card-link" to={`${getUser.user ? `/product/${item.id}` : "/register"}`}>В корзину</Link></button>
                                </div>
                            </div>
                        ))
                    }





                </div>
                {
                    limit >= list.length ?
                        <div onClick={() => {
                            dispatch(changeLimit(8))
                        }} className="home__pages">
                            <h3 className="home__pages-title">Скрыть</h3>
                            <img src={arrow} className="home__pages-rightt" />
                        </div>
                        :
                        <div onClick={() => {
                            dispatch(changeLimit(max))
                        }} className="home__pages">
                            <h3 className="home__pages-title">Показать все</h3>
                            <img src={arrow}  className="home__pages-right" />
                        </div>

                }


                <h2 className="home__akc">Наши <span>акции</span> </h2>
                <div className="home__akcii">
                    <div className="home__akcii-left">
                        <img className="home__akcii-img1" src={akcii} alt=""/>
                    </div>
                    <div className="home__akcii-right">
                        <img className="home__akcii-img" src={akcii} alt=""/>
                        <img className="home__akcii-img" src={akcii} alt=""/>
                        <img className="home__akcii-img" src={akcii} alt=""/>
                        <img className="home__akcii-img" src={akcii} alt=""/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;