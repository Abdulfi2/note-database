import styles from "./Global.module.css";

function Global({ title }) {
    return (
        <div className={styles.container}>
            <div className={styles.Global__text}>
                <h1 className={styles.Global__title}>{title}</h1>
            </div>
        </div>
    )
}

export default Global;