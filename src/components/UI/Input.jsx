/* eslint-disable react/prop-types */
import styles from '../../styles/Input.module.css';

export default function Input({ id, label, ...props }) {
    return (
        <p className={styles.control}>
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} required {...props} />
        </p>
    );
}
