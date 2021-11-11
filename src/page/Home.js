import { Link } from "react-router-dom"
import { getToken } from "../service/auth"
import NotesList from './NotesList'

export default function Home() {
  const user = getToken()
  return(
    <div className='flex flex-col items-center gap-10 justify-center'>
      <h1 className='text-xl'>Welcome to Notes App</h1>
      {user ? <NotesList/> : 
      <div className=' w-1/2 flex flex-col gap-10 justify-center'>
        <button className='px-5 border-2 py-4 text-lg'>
          <Link to ='/register'>Register Here</Link>
        </button>
        <button className='px-5 border-2 py-4 text-lg'>
          <Link to ='/Login'>Login</Link>
        </button>
      </div>}
    </div>
  )
}