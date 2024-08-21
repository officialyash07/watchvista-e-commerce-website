/* eslint-disable react/prop-types */
import styles from '../styles/CartItem.module.css';
import plus from '../assets/add.png';
import minus from '../assets/minus.png';
import { currencyFormatter } from '../util/formatting';

export default function CartItem({ image, name, quantity, price, onIncrease, onDecrease }) {
    return (
        <li id={styles.cartItem}>
            <div className={styles.cartItemImage}>
                <img src={`http://localhost:3000/${image}`} alt="" />
            </div>
            <div className={styles.secondDiv}>
                <h2>{name}</h2>
                <p className={styles.cartItemPrice}>
                    {currencyFormatter.format(price)} &nbsp;x &nbsp;{quantity}
                </p>
            </div>
            <div className={styles.cartItemActions}>
                <button onClick={onDecrease}>
                    <img src={minus} alt="Minus" />
                </button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>
                    <img src={plus} alt="Plus" />
                </button>
            </div>
        </li>
    );
}
