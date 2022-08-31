import './App.css';
import Header from './components/Header/Header';
import Form from './components/AddForm/Form';
import Note from './components/Note/Note';
import Global from './components/Global/Global';
import React from 'react';
import { getInitialData, showFormattedDate } from './utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      search: '',
      archives: []
    }

    this.onAddNotes = this.onAddNotes.bind(this)
    this.onDeleteHandler = this.onDeleteHandler.bind(this)
    this.onSearchHandler = this.onSearchHandler.bind(this)
    this.onAddArchive = this.onAddArchive.bind(this)
    this.onUndoArchive = this.onUndoArchive.bind(this)
  }

  onAddNotes({ body, title, archived }) {
    this.setState((prev) => {
      if (archived !== true) {
        return {
          notes: [
            ...prev.notes,
            {
              id: +new Date(),
              title,
              body,
              archived,
              createdAt: new Date()
            }
          ]
        }
      } else {
        return {
          archives: [
            ...prev.archives,
            {
              id: +new Date(),
              title,
              body,
              archived,
              createdAt: new Date()
            }
          ]
        }
      }
    }
    )
  }

  onAddArchive(id) {
    const archives = this.state.notes.filter(note => note.id === id).map((note) => { note.archived = !(note.archived); return note })
    const existing = this.state.notes.filter(note => note.id !== id)
    this.setState((prev) => {
      return {
        archives: [...prev.archives, ...archives],
        notes: existing
      }
    })
  }

  onSearchHandler(e) {
    this.setState(() => {
      return {
        search: e.target.value
      }
    })
  }

  onUndoArchive(id) {
    const notes = this.state.archives.filter(archive => archive.id === id).map((archive) => { archive.archived = !(archive.archived); return archive })
    const existing = this.state.archives.filter(archive => archive.id !== id)
    this.setState((prev) => {
      return {
        notes: [...prev.notes, ...notes],
        archives: existing
      }
    })
  }

  onDeleteHandler(id, archived) {
    if (archived === true) {
      const archives = this.state.archives.filter(archive => archive.id !== id)
      this.setState({ archives })
    } else {
      const notes = this.state.notes.filter(note => note.id !== id)
      this.setState({ notes })
    }
  }

  render() {
    return (
      <div className="App">
        <Header onSearchHandler={this.onSearchHandler} />
        <div className="container">
          <div className="row">
            <div className="col-lg-4 form-out">
              <div className='pt-5'>
                <div className='container'>
                  <Form addNotes={this.onAddNotes} />
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="container text-center pt-5">
                <Global title="Catatan" />
                <div className="content">
                  {
                    this.state.notes.length === 0 ? (
                      <div>Tidak ada Catatan</div>
                    ) : (
                      this.state.notes.filter((note) => { 
                        if (this.state.search === '') {
                          return note
                        } else if (note.title.toLowerCase().includes(this.state.search.toLowerCase())) {
                          return note
                        }
                      }).map((note) => (
                        <Note key={note.id} title={note.title} createdAt={showFormattedDate(note.createdAt)} archived={note.archived} body={note.body} onDelete={this.onDeleteHandler} id={note.id} onArchive={this.onAddArchive} />
                      ))
                    )
                  }
                </div>
              </div>
              <div className="container text-center pt-5">
                <Global title="Arsip" />
                <div className="content">
                  {
                    this.state.archives.length === 0 ? (<div className='mb-5'>Tidak ada Arsip</div>) : (
                      this.state.archives.filter(archive => {
                        if (this.state.search === '') {
                          return archive
                        } else if (archive.title.toLowerCase().includes(this.state.search.toLowerCase())) {
                          return archive
                        }
                      }).map((archive) => (
                        <Note key={archive.id} title={archive.title} createdAt={showFormattedDate(archive.createdAt)} archived={archive.archived} body={archive.body} onDelete={this.onDeleteHandler} id={archive.id} onUndoArchive={this.onUndoArchive} />
                      ))
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;