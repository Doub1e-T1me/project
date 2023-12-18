import styles from "./topNavigationBar.module.css";
import { Link } from "react-router-dom";

export const TopNavigationBar = ({ cart ,isLoggedIn, setIsLoggedIn}) => {

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("로그아웃되었습니다.");
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/">
          <h1 className={styles.logo}>
            <img src="/images/logo.png" alt="로고" />
          </h1>
        </Link>
        <div className={styles.input_wrap}>
          <input type="text" placeholder="상품을 검색해보세요!" />
          <img src="/images/icon-search.svg" alt="검색" />
        </div>
      </div>

      <div className={styles.menu}>
        <Link to="/cart">
          <div className={styles.shopping_cart}>
            <img src="/images/icon-shopping-cart.svg" alt="장바구니" />
            <span>장바구니</span>
            {cart.length >= 1 ? (
              <div className={styles.new_shopping_cart}>
                <p>{cart.length}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </Link>
        {isLoggedIn ? (
          <div className={styles.mypage} onClick={handleLogout}>
            <img src="/images/icon-user.svg" alt="사용자" />
            <span>로그아웃</span>
          </div>
        ) : (
          <Link to="/login">
            <div className={styles.mypage}>
              <img src="/images/icon-user.svg" alt="사용자" />
              <span>로그인</span>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};