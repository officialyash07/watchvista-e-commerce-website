import styles from '../styles/Header.module.css';
import logo from '../assets/logo.png';
import cartLogo from '../assets/shopping-cart.png';
import Navbar from './Navbar';
import { useContext } from 'react';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';

export default function Header() {
    const { items } = useContext(CartContext);
    const { showCart } = useContext(UserProgressContext);

    //...Reduce method converts an array into a single value/number.
    //...Reduce takes 2 arguments. 1st is the function, 2nd is the starting value.
    //...1st argument which is the function also takes 2 arguments by default.
    //...1st is the final value and 2nd is the every item on the items array which reduce method has to work.

    const totalCartItems = items.reduce((totalNoOfItems, item) => {
        return totalNoOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        showCart();
    }

    return (
        <header id={styles.header}>
            <div className={styles.mainLogo}>
                <img src={logo} alt="" />
            </div>
            <nav>
                <Navbar />
                <button onClick={handleShowCart}>
                    <img src={cartLogo} alt="" />
                    <span>{totalCartItems}</span>
                </button>
            </nav>
        </header>
    );
}
