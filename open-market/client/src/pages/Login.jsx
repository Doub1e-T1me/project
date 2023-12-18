import styles from "../components/login/login.css";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const [id, setid] = useState('');
    const [pw, setPw] = useState('');

    const [idValid, setidValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    useEffect(() => {
      if(idValid && pwValid) {
        setNotAllow(false);
        return;
      }
      setNotAllow(true);
    }, [idValid, pwValid]);

    const handleid = (e) => {
      setid(e.target.value);
      const regex = /^\d{10}$/;
      if (regex.test(e.target.value)) {
        setidValid(true);
      } else {
        setidValid(false);
      }
    };
    const handlePw = (e) => {
      setPw(e.target.value);
      const regex = /^\d{8}$/;
      if (regex.test(e.target.value)) {
        setPwValid(true);
      } else {
        setPwValid(false);
      }
    };
    const onClickConfirmButton = () => {
      axios.get('http://localhost:5000/login') // Express 서버의 URL
        .then(response => {
          const users = response.data;
          const foundUser = users.find(user => user.studentID.toString() === id && user.password.toString() === pw);

          if (foundUser) {
            alert('로그인에 성공했습니다.');
            setIsLoggedIn(true);
            navigate('/');
          } else {
            alert('등록되지 않은 회원이거나 정보가 일치하지 않습니다.');
          }
        })
        .catch(error => {
          alert('서버와의 통신 중 오류가 발생했습니다.');
          console.error(error);
        });
    };

    return (
      <div className="page">
        <div className="titleWrap">
          학번과 비밀번호을
          <br />
          입력해주세요
        </div>

        <div className="contentWrap">
          <div className="inputTitle">학번</div>
          <div
            className="inputWrap"
          >
            <input
              className="input"
              type="text"
              placeholder="2018212990"
              value={id}
              onChange={handleid}
            />
          </div>
          <div className="errorMessageWrap">
            {!idValid && id.length > 0 && (
              <div>올바른 학번을 입력해주세요.</div>
            )}
          </div>

          <div style={{ marginTop: "26px" }} className="inputTitle">
            비밀번호
          </div>
          <div className="inputWrap">
            <input
              className="input"
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={handlePw}
            />
          </div>
          <div className="errorMessageWrap">
            {!pwValid && pw.length > 0 && (
              <div>비밀번호을 입력해주세요.</div>
            )}
          </div>
        </div>

        <div>
          <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
            확인
          </button>
        </div>
      </div>
    );
}