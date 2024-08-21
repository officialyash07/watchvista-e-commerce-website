import styles from '../../styles/Button.module.css';

/* eslint-disable react/prop-types */
export default function Button({ children, textOnly, ...props }) {
    let cssClasses = textOnly ? styles.textOnly : styles.button;

    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>
    );
}
