import React from "react";
import styles from "./Form.module.css";

class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            body: '',
            archived: ''
        }

        this.onTitleChange = this.onTitleChange.bind(this)
        this.onBodyChange = this.onBodyChange.bind(this)
        this.onArchiveChange = this.onArchiveChange.bind(this)
        this.onSubmiteHandler = this.onSubmiteHandler.bind(this)
    }

    onTitleChange(e) {
        this.setState(() => {
            return { title: e.target.value.slice(0, 50) }
        })
    }

    onBodyChange(e) {
        this.setState(() => {
            return {
                body: e.target.value
            }
        })
    }

    onArchiveChange(e) {
        this.setState(() => {
            return {
                archived: e.target.checked
            }
        })
    }

    onSubmiteHandler(e) {
        e.preventDefault()
        this.props.addNotes(this.state)
    }

    render() {
        return (
            <div className={styles.container}>
                <section className={styles.form}>
                    <form onSubmit={this.onSubmiteHandler}>
                        <h2 className={styles.form__title}>Buat Catatan</h2>
                        <div className={styles.form__group}>
                            <label htmlFor="judulCatatan" className={styles.form__label}>Judul Catatan <br /> Sisa Karakter: {this.state.title.length}/50</label>                            
                            <input 
                                type="text" 
                                className={styles.form__input} 
                                id="judulCatatan" 
                                placeholder="Tuliskan judul" 
                                value={this.state.title} 
                                onChange={this.onTitleChange} />
                        </div>
                        <div className={styles.form__group}>
                            <label htmlFor="catatan" className={styles.form__label}>Detail Catatan</label>
                            <textarea 
                                className={styles.form__input} 
                                placeholder="Tuliskan ceritamu" 
                                id="catatan" 
                                value={this.state.body} 
                                onChange={this.onBodyChange}>
                            </textarea>
                        </div>
                        <div className={styles.column}>
                            <input type="checkbox" 
                                className={styles.form__check} 
                                id="archive" value={this.state.archive} 
                                onChange={this.onArchiveChange} 
                            />
                            <label className={styles.form__label} htmlFor="archive">Arsipkan catatan</label>
                        </div>
                        <br/>
                        <button type="submit" className={styles.form__button}>Submit</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default Form;