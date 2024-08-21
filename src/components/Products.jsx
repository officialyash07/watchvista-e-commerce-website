// import { useEffect, useState } from 'react';
import styles from '../styles/Products.module.css';
import ProductItem from './ProductItem';
import useHttp from './hooks/useHttp';

const requestConfig = {};

export default function Products() {
    //...Way of fetching data

    // const [loadedProducts, setLoadedProducts] = useState([]);

    // useEffect(() => {
    //     async function fetchProducts() {
    //         const response = await fetch(
    //             'https://watchvista-project-default-rtdb.asia-southeast1.firebasedatabase.app',
    //             { mode: 'no-cors' }
    //         );
    //         const products = await response.json();
    //         console.log(products);
    //         setLoadedProducts(products);
    //     }
    //     fetchProducts();
    // }, []);

    const { data: loadedProducts, isLoading, error } = useHttp('http://localhost:3000/products', requestConfig, []);

    if (isLoading) {
        return <p className={styles.message}>Fetching Products. Please wait for a moment...</p>;
    }

    if (error) {
        return <p className={styles.message}>Something went wrong. Failed to fetch Products...</p>;
    }

    return (
        <ul id={styles.products}>
            {loadedProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </ul>
    );
}
