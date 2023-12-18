import express from "express";
import cors from 'cors';
import mysql from "mysql";

const app = express();

app.use(cors());

app.use(express.json());

app.get('/login', (req, res) => {
    db.query('SELECT StudentID, password FROM Login', (err, result) => {
      if (err) {
        res.status(500).send('데이터베이스에서 로그인 정보를 가져오는 중 오류가 발생했습니다.');
      } else {
        res.json(result); // 뷰(Login)의 데이터를 JSON 형태로 반환
      }
    });
  });
 
const db = mysql.createConnection({
    host: "datawiz.czt8qukhmbgp.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "datawizpj",
    port: "3306",
    database: "project"
});

db.connect(err => {
    console.log("db 연결 성공!!");
    console.log("err", err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`서버 실행 중. 포트: ${PORT}`);
});