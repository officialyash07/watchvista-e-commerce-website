import styles from '../styles/Navbar.module.css';

export default function Navbar() {
    return (
        <ul id={styles.navbar}>
            <li>
                <a href="">home</a>
            </li>
            <li>
                <a href="">about us</a>
            </li>
            <li>
                <a href="">showroom</a>
            </li>
            <li>
                <a href="">contact us</a>
            </li>
        </ul>
    );
}
