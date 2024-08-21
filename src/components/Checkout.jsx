import styles from '../styles/Checkout.module.css';
import Modal from './UI/Modal';
import { currencyFormatter } from '../util/formatting';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';
import { useContext } from 'react';
import Input from './UI/Input';
import Button from './UI/Button';
import useHttp from './hooks/useHttp';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

export default function Checkout() {
    const { items, clearCart } = useContext(CartContext);
    const { progress, hideCheckout } = useContext(UserProgressContext);

    const {
        data,
        error,
        isLoading: isSending,
        sendRequest,
        clearData,
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);

    function handleCloseCheckout() {
        hideCheckout();
    }

    function handleFinish() {
        hideCheckout();
        clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        console.log(customerData);

        sendRequest(
            JSON.stringify({
                order: {
                    items: items,
                    customer: customerData,
                },
            })
        );

        //...Way of sending data

        // fetch('http://localhost:3000/orders', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         order: {
        //             items: items,
        //             customer: customerData,
        //         },
        //     }),
        // });
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleCloseCheckout}>
                Close
            </Button>
            <Button>Place Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending Order Details...</span>;
    }

    if (data && !error) {
        return (
            <Modal open={progress === 'checkout'} onClose={handleFinish}>
                <h2>Success</h2>
                <p>Your order was placed successfully.</p>
                <p>Order tracking details will be sent to your registered email address.</p>
                <p className={styles.modalActions}>
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal open={progress === 'checkout'} onClose={handleCloseCheckout}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout Details</h2>
                <p className={styles.cartTotal}>{`Total Amount: ${currencyFormatter.format(cartTotal)}`}</p>
                <Input label="Full name" id="name" type="text" />
                <Input label="E-mail address" id="email" type="email" />
                <Input label="Street" id="street" type="text" />
                <div>
                    <Input label="City" id="city" type="text" />
                    <Input label="Postal Code" id="postal-code" type="text" />
                </div>
                {/* {error && <p>{error.message}</p>} */}
                <p className={styles.modalActions}>{actions}</p>
            </form>
        </Modal>
    );
}
