import React, { useState } from 'react';
import './App.css';
import Loader from './modules/loader/loader';
import axio from 'axios';

axio.defaults.baseURL = 'http://127.0.0.1:4000/api';

const App: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const [preload, setPreload] = useState<boolean>(false);

    const validator = () => {
        let err = ''
        if (email === ''){
            err += 'Почта не заполнена!';
        }
        if (email.length > 50){
            err += 'Длина почтового адреса превышает доступный лимит!';
        }
        if (phone === ''){
            err += 'Номер телефона не заполнен!';
        }
        if (phone.length > 20){
            err += 'Длина номера телефона превышает доступный лимит!';
        }
        return err;
    }

    const addUser = async () => {
        setPreload(true);
        let err = validator();
        if (err){
            setPreload(false);
            return alert(err);
        }
        let data = {
            email: email,
            phone: phone
        }
        await axio.post('/users/addUser', {data}).then( () => {
            alert('Сохранение успешно');
        }).catch( (err) => {
            console.error(err);
            alert('Данные не удалось сохранить')
        });
        setPreload(false);
    }

    const findUser = async () => {
        setPreload(true);
        let err = validator();
        if (err){
            setPreload(false);
            return alert(err);
        }
        let data = {
            email: email,
            phone: phone
        }
        await axio.post('/users/findUser', {data}).then(res => {
            alert('Пользователь существует');
        }).catch( (err) => {
            if (err.response.status === 400){
                alert('Пользователь не существует');
            }else{
                console.error(err);
                alert('Ошибка сервера')
            }
        });
        setPreload(false);
    }

    const recovery = async () => {
        setPreload(true);
        let err = '';
        if (email === ''){
            err += 'Почта не заполнена!';
        }
        if (email.length > 50){
            err += 'Длина почтового адреса превышает доступный лимит!';
        }
        if (err){
            setPreload(false);
            return alert(err);
        }
        let data = {
            email: email
        }
        await axio.post('/users/recovery', {data}).then(res => {
            alert('Номер телефона отправлен на почту');
        }).catch( (err) => {
            if (err.response.status === 404){
                alert('Пользователь с такой почтой не существует');
            }else{
                console.error(err);
                alert('Ошибка сервера')
            }
        });
        setPreload(false);
    }

  return (
    <div className="App">
        {preload && <Loader/>}
        <div className='dfc jcc wd1'>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>Email</label>
                        </td>
                        <td>
                            <input onChange={ (e) => setEmail(e.target.value) } value={ email }></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Phone number</label>
                        </td>
                        <td>
                            <input onChange={ (e) => setPhone(e.target.value) } value={ phone }></input>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className='button' onClick={ addUser }>Добавить</button>
            <button className='button button_green' onClick={ findUser }>Проверить</button>
            <button className='button button_yellow' onClick={ recovery }>Восстановить</button>
        </div>
    </div>
  );
}

export default App;