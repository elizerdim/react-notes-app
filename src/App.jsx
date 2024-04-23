import { useState, useEffect } from 'react'
import Sidebar from './Components/Sidebar'
import Editor from './Components/Editor'
import Split from 'react-split'
import { nanoid } from 'nanoid'


export default function App() {
  const [ notes, setNotes ] = useState(
    () => JSON.parse(localStorage.getItem('notes')) || [] //lazy state initialization
  );
  const [ currentNoteId, setCurrentNoteId ] = useState(notes[0]?.id || '');
  const currentNote = notes.find(note => note.id === currentNoteId) || notes[0];

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "#Type your markdown note's title here"
    }

    setNotes([newNote, ...notes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    // bump the updated note to the top
    currentNote.body = text;
    const currentNoteIndex = notes.findIndex(note => note.id === currentNoteId);
    setNotes([
      currentNote, 
      ...notes.slice(0, currentNoteIndex), 
      ...notes.slice(currentNoteIndex + 1)
    ]);
  }

  function deleteNote(e, noteId) {
    e.stopPropagation();
    setNotes(notes.filter(note => note.id !== noteId));
  }

  return (
    <>
      <main>
        {
          notes.length > 0
          ?
          <Split
            sizes={[30, 70]}
            direction='horizontal'
            className='split'
          >
            <Sidebar 
              notes={notes}
              currentNote={currentNote}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            {
              currentNoteId &&
              notes.length > 0 &&
              <Editor 
                currentNote={currentNote}
                updateNote={updateNote}
              />
            }
          </Split>
          :
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button
              className='first-note'
              onClick={createNewNote}
            >
              Create one now
            </button>
          </div>
        }
      </main>
    </>
  )
}