import React, { useEffect, useState } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch all notes when the app loads
  useEffect(() => {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = { title, content };

    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote)
      });

      const saved = await res.json();
      setNotes(prev => [...prev, saved]); // Add new note to the list
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>TFT Notes Tracker</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Note content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Note</button>
      </form>

      {notes.length > 0 ? (
        notes.map(note => (
          <div key={note._id} style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))
      ) : (
        <p>No notes yet</p>
      )}
    </div>
  );
}

export default App;
