import * as React from 'react';
import styles from "./Header.module.css";

class Header extends React.Component {
    render(){
        return (
            <header className={styles.navbar}>
                <div className={styles.container}>
                    <h3 className={styles.heading}>Notes Application</h3>
                    <nav className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search Note" aria-label="Search" onChange={this.props.onSearchHandler} />
                    </nav>
                </div>
            </header>

        )
    }
}

export default Header