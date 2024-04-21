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

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes])

  function findCurrentNote() {
    return notes.find(note => note.id === currentNoteId) || notes[0];
  }

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
    const currentNote = findCurrentNote();
    currentNote.body = text;
    const currentNoteIndex = notes.findIndex(note => note.id === currentNoteId);
    setNotes([
      currentNote, 
      ...notes.slice(0, currentNoteIndex), 
      ...notes.slice(currentNoteIndex + 1)
    ]);
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
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
            />
            {
              currentNoteId &&
              notes.length > 0 &&
              <Editor 
                currentNote={findCurrentNote()}
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