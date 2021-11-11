import { useState } from "react"
import { fetchingItem } from "../service/checklist-item"

export default function Item({data}) {
const [edit, setEdit] = useState(false)
const [editData, setEditData] = useState('')
const [message, setMessage] = useState(null)
const handleDelete  = () => {
  fetchingItem(data.id, {method: 'DELETE'})
  .then(res => console.log(res))
}


const handleEdit  = (event) => {
  setEditData(event.target.value)
}

const handleRename = (event) => {
  event.preventDefault()
  fetchingItem(`rename/${data.id}`, {
    method:'PUT', 
    body: JSON.stringify({
      checklistId: data.id,
      itemName: editData
    })
  }).then(res => {console.log(res)
  if(res.errorMessage) {
    setMessage(res.errorMessage)
  }
  })
}

const handleUpdate = (event) => {
  event.preventDefault()
  fetchingItem(`${data.id}`, {
    method:'PUT', 
    body: JSON.stringify({
      checklistId: data.id,
      itemName: editData
    })
  }).then(res => console.log(res))
}


console.log(data)
  return(
    <div className='border-2 px-5 gap-4 flex flex-col items-center justify-between'>
      <div>
        <button className='bg-red-300 px-4' onClick={handleDelete}>
          DELETE
        </button>
        <button className='bg-blue-300 px-4' onClick={handleUpdate}>
          UPDATE
        </button>
      </div>
     
      {data.checklistCompletionStatus ? 'Selesai': 'Belum Selesai'}
      <p>{data.name}</p>
      <button className='bg-blue-300 px-4' onClick={() => setEdit(!edit)}>
        Edit
      </button>
      {edit && 
      <form onSubmit={(event) => handleRename(event)}>
        <p>Rename Notes</p>
        <input className='border-4' type='text' value={editData} onChange={handleEdit}></input>
        <button type='submit' className='bg-yellow-400 border-4'>Rename</button>
      </form>}

      <p className='bg-yellow-600 text-white'>{message}</p>
    </div>
  )
}