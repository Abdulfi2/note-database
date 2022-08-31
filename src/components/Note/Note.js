import React from "react";
import styles from "./Note.module.css";

class Note extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <section className={styles.column} >
                    <div className={styles.card}>
                        <h3 className={styles.title}>{this.props.title}</h3>
                        <p className={styles.date}>{this.props.createdAt}</p>
                        <p className={styles.paragraph}>{this.props.body}</p>
                        <div className="row">
                            <div className="col">
                                {
                                    this.props.archived === true ? (
                                        <button type="button" className={styles.green} onClick={() => this.props.onUndoArchive(this.props.id)}>Pindahkan</button>
                                    ) : (
                                        <button type="button" className={styles.green} onClick={() => this.props.onArchive(this.props.id)}>Arsipkan</button>
                                    )
                                }
                            </div>
                            <div className="col">
                                <button type="button" className={styles.red} onClick={() => this.props.onDelete(this.props.id, this.props.archived)}>Hapus</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Note;