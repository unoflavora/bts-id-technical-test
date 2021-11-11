import { useEffect, useState } from "react"
import { fetching } from "../service/checklist"
import {logout} from '../service/auth'
import { fetchingItem } from "../service/checklist-item";
import { useNavigate } from "react-router-dom";
import Item from "./Item";
const NotesList = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [addForm, setAddForm] = useState(false)
  const [notes, setNotes] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [view, setView] = useState(false)

  const navigate = useNavigate()
  
  useEffect(() => {
    console.log('running')
    setLoading(true)
    fetching('', {method: 'GET'})
    .then(res => {
      console.log(res)
      setData(res.data)
      setLoading(false)
    })
    .catch(e => console.log(e))
  }, [])


  const handleSubmit = (event) => {
    console.log(notes)
    fetching('', {
      method: 'POST', 
      body: JSON.stringify({'name': notes})})
    .then(res => {data[res.data.id] = res.data.message})
  }

  const handleDelete = (id) => {
    console.log(id)
    fetching(`${id}`, {
      method: 'DELETE', 
    })
    .then(res => {
      console.log(res)
      if(res.errorMessage) {
        setError(res.errorMessage)
        setTimeout(()=> setError(''), 3000)
        delete data[id]
      } else {
        setMessage(res.message)
        setTimeout(()=> setMessage(''), 3000)
      }
    })
    .catch(e => console.log(e))
  }
  
  const handleLogout = () => {
    logout()
    navigate('/')
  }

console.log('datais', data)


  return(
    <div className='w-full overflow-x-hidden flex flex-col justify-center items-center gap-5'>
      <p>Hello</p>
      <button className='py-5 bg-green-200 px-5' onClick={() => setAddForm(!addForm)}>
        {addForm ?'Sembunyikan form' :  'Tambahkan Note Baru'}
      </button>
      <button onClick={handleLogout}>
        Logout
      </button>

      {error && <p>{error}</p>}
      {message && <p>{message}</p>}


        <div className={addForm ? 'block' : 'hidden'}>
        <form onSubmit={handleSubmit}>
          <p>Masukan notes</p>
          <input onChange={(event) => setNotes(event.target.value)} className='border-2 py-2' type='text'></input>
          <button type='submit' className='bg-green-200 h-full py-2 border-2' type='submit'>Submit</button>
        </form>
      </div>

      <div>
        <ul className='flex flex-col gap-4'>
        {!loading && data && Object.keys(data).map(
          (item) => 
          <li className='flex flex-col gap-5'>
            <div className='flex justify-between gap-5'>
              {console.log(data[item])}
              <button 
              className='px-5 bg-green-200'
              onClick={() => setView(data[item].id)}>
                Details
              </button>
              {data[item].name}
              <button 
              onClick={() => handleDelete(data[item].id)}
              className='px-1 py-2 border-2 bg-red-500 text-white'>
                Delete
              </button>
            </div>
          <div>
          {view === data[item].id ? <Item data={data[item]}/> : null}

          </div>           

          </li>
        )}
        </ul>
      </div>
    </div>
  )
}

export default NotesList