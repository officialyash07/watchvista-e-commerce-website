import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Products from './components/Products';
import { CartContextProvider } from './store/CartContext';
import { UserProgressContextProvider } from './store/UserProgressContext';

function App() {
    return (
        <UserProgressContextProvider>
            <CartContextProvider>
                <Header />
                <Products />
                <Cart />
                <Checkout />
            </CartContextProvider>
        </UserProgressContextProvider>
    );
}

export default App;
