import { useContext } from 'react';
import styles from '../styles/Cart.module.css';
import Modal from './UI/Modal';
import CartItem from './CartItem';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';

export default function Cart() {
    const { items, addItem, removeItem } = useContext(CartContext);
    const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

    const cartTotal = items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);

    function handleCloseCart() {
        hideCart();
    }

    function handleGoToCheckout() {
        showCheckout();
    }

    return (
        <Modal
            className={styles.cart}
            open={progress === 'cart'}
            onClose={progress === 'cart' ? handleCloseCart : null}
        >
            <h2>Your Cart</h2>
            <ul>
                {items.map((item) => (
                    <CartItem
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => addItem(item)}
                        onDecrease={() => removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className={styles.cartTotal}>{`Total Amount: ${currencyFormatter.format(cartTotal)}`}</p>
            <p className={styles.modalActions}>
                <Button textOnly onClick={handleCloseCart}>
                    Close
                </Button>
                {items.length > 0 && <Button onClick={handleGoToCheckout}>Checkout</Button>}
            </p>
        </Modal>
    );
}
