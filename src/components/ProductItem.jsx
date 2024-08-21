/* eslint-disable react/prop-types */
import styles from '../styles/ProductItem.module.css';
import { currencyFormatter } from '../util/formatting';
import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

export default function ProductItem({ product }) {
    const { addItem } = useContext(CartContext);

    function handleAddItemToCart() {
        addItem(product);
    }

    return (
        <li id={styles.productItem}>
            <article>
                <img src={`http://localhost:3000/${product.image}`} alt="" />
                <div>
                    <h3>{product.name}</h3>
                    <p className={styles.ProductItemPrice}>{currencyFormatter.format(product.price)}</p>
                    <p className={styles.ProductItemDescription}>{product.description}</p>
                </div>
                <p className={styles.ProductItemActions}>
                    <button onClick={handleAddItemToCart}>Add to Cart</button>
                </p>
            </article>
        </li>
    );
}
