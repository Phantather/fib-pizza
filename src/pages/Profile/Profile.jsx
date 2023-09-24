import React from 'react';

const Profile = () => {

    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)


    return (
        <section className="profile">
            <div className="container">
                <div className="profile__row">
                    <h2 className="profile__title">
                        Личные данные
                    </h2>
                    <form className="profile__form">
                        <label className="profile__label">
                            <h3 className="profile__name">Логин</h3>
                            <input value={user.user.login} type="text"/>
                        </label>
                        <label className="profile__label">
                            <h3 className="profile__name">Номер телефона</h3>
                            <input value={user.user.tel} type="tel"/>
                        </label>
                        <label className="profile__label">
                            <h3 className="profile__name">Пароль</h3>
                            <input placeholder="пароль" type="password"/>
                        </label>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Profile;