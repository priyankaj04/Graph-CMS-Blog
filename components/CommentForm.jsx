import React, { useRef, useState, useEffect } from 'react'
import {submitComment} from '../services'

const CommentForm = ({ slug }) => {
      const [error, setError] = useState(false);
      const [localStorage, setLocalStorage] = useState(null);
      const [showSuccessMsg, setShowSuccessMsg] = useState(false);
      const commentEl = useRef();
      const nameEl = useRef();
      const emailEl = useRef();
      const storeDataEl = useRef();

      useEffect(() => {
            nameEl.current.value = window.localStorage.getItem('name');
            emailEl.current.value = window.localStorage.getItem('email')
      }, [])

      const handleCommentSubmission = () => {
            setError(false);

            const { value: comment } = commentEl.current;
            const { value: name } = nameEl.current;
            const { value: email } = emailEl.current;
            const { checked: storeData } = storeDataEl.current;

            if (!comment || !name || !email) {
                  setError(true);
                  return;
            }

            const commentObj = { name, email, comment, slug }

            if (storeData)
            {
                  window.localStorage.setItem('name', name);
                  window.localStorage.setItem('email', email);
            } else {
                  window.localStorage.removeItem('name');
                  window.localStorage.removeItem('email');
            }

            submitComment(commentObj)
                  .then((res) => {
                        setShowSuccessMsg(true);

                        setTimeout(() => {
                              setShowSuccessMsg(false);
                        }, 3000)
            })
      }

      return (
            <div className = 'bg-white shadowlg rounded-lg p-8 pb-12 mb-8'>
                  <h3 className = 'text-xl mb-8 font-semiold border-b pb-4'>
                        Leave a Reply
                  </h3>
                  <div className='grid grid-cols-1 gap-4 mb-4'>
                        <textarea
                              ref={commentEl}
                              className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                              placeholder='Comment'
                              name='comment'
                        />
                  </div>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
                        <input
                              type='text' ref={nameEl}
                              className='px-4 py-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                              name='name'
                              placeholder='Name'
                        />
                        <input
                              type='text' ref={emailEl}
                              className='px-4 py-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                              name='email'
                              placeholder='E-mail'
                        />
                  </div>
                  <div className='grid grid-cols-1 gap-4 mb-4'>
                        <div>
                              <input
                                    ref={storeDataEl} type='checkbox' id='storeData' name='storeData' value='true'
                              />
                              <label className ='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>Save my name and e-mail for the next time I comment.</label>
                        </div>
                  </div>
                  {error && <p className='text-xs text-red-500'>All fields are required.</p>}
                  <div className= 'mt-8'>
                        <button
                              type='button'
                              onClick={handleCommentSubmission}
                              className='transition duration-500 transform hover:-translate-y-1 inline-block bg-green-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer hover:bg-green-700'
                        >
                              Post Comment
                        </button>
                        {showSuccessMsg && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comments submitted for review!</span>}
                  </div>
            </div>
      )
}

export default CommentForm