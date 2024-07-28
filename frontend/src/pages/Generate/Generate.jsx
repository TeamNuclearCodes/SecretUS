import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Generate() {
    const [generated,setGenerated] = useState("")
    useEffect(() => {
        const generator = async () => {
            try {
      const res = await axios.get(
        'https://random-word-api.herokuapp.com/word?number=4',
      );
      const generatedPhrase = res.data[0] + res.data[1] + res.data[2] + res.data[3];
      console.log(generated);
      setGenerated(generatedPhrase)
    } catch (err) {
      console.log(err)
    }
        }
        generator()
  },[]
    )
  return (
    <div>{generated}</div>
  )
}

export default Generate