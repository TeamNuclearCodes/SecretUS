import { useState, useEffect } from "react"

const PGPKeys = () => {
  const [ keyList, setKeyList ] = useState([])
  
  useEffect(() => {
    fetch('/api/pgpvault/list')
      .then(res => res.json)
      .then(data => console.log(data))
  },[])

  return (
    <div className='flex text-white w-full p-2'>
      <h1 className='text-3xl mr-auto ml-auto'>PGP Keys</h1>
    </div>
  )
}

export default PGPKeys