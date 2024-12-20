'use client'
{/** To-Do List */}

import React, { useState } from 'react';
import '../globals.css';
import { space } from 'postcss/lib/list';

const Main = () => {

  const [list, setList] = useState([]);
  const [noteInput, setNoteInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const AddNote = () => {
    if (noteInput.trim() === '') return;
    if (editIndex !== null) {
      setList(prevNote => {
        const newNote = [...prevNote];
        newNote[editIndex] = noteInput;
        return newNote;
      });
      setEditIndex(null);
    } else {
      setList(prevList => [...prevList, noteInput]);
    }

    setNoteInput('');
  };

  const removeNotes = (index) => {
    setList(prevList => {
      const newList = prevList.filter((_,i) => i !== index);
      console.log(newList)
      return newList;
    })

    if (editIndex === index) {
      setEditIndex(null);
    }
  };

  const editNotes = (index) => {
    setNoteInput(list[index]);
    setEditIndex(index);
  }

  const keyDown = (e) => {
    if (e.key === 'Enter') {
      AddNote();
    };
  };

  return <>
    <section id='comic-shanns-mono' className="p-4 flex flex-col gap-4 justify-center items-center h-screen">
        <strong className='text-4xl'>To-Do App</strong>
        {/** ADD NOTES */}
        <section className='flex gap-4 bg-[#E68369] p-2 rounded-md w-[20em]'>
          <input
            className='outline-none px-4 py-2 rounded-md text-[#E68369] w-full'
            type="text"
            value={noteInput}
            placeholder='Add note...'
            onChange={(e) => setNoteInput(e.target.value)}
            onKeyDown={keyDown}
          />
          <button onClick={AddNote} className='bg-[#4b5297] px-3 rounded-md hover:scale-105 duration-200'>
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </section>
        {/** ADDED NOTES */}
        <section className='space-y-3'>
          {list.map((note, index) => (
            <div key={index} className='cursor-pointer hover:scale-105 duration-200 flex justify-between items-center bg-[#4b5297] px-4 py-2 w-[20em] rounded-md shadow-md'>
              {/** ADDED NOTES */}
              <article>{note}</article>
              {/** OPTIONS BUTTON */}
              <article className='flex gap-2'>
                <button
                  onClick={() => editNotes(index)}
                  className='flex items-center text-xl hover:scale-110 duration-200 hover:text-yellow-500'><ion-icon name="create-outline"></ion-icon>
                </button>
                <button
                  onClick={() => removeNotes(index)}
                  className='flex items-center text-xl hover:scale-110 duration-200 hover:text-red-500'><ion-icon name="trash-outline"></ion-icon>
                </button>
              </article>
          </div>
          ))}
        </section>
    </section>
  </>
}

export default Main;