import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const SearchBox = () => {
  const { keyword: urlKeyword } = useParams()
  const navigate = useNavigate()

  const [keyword, setKeyWord] = useState(urlKeyword || '')

  const submitHandler = (e) => {
    e.preventDefault()

    console.log(keyword)

    if (keyword) {
      navigate(`/search/${keyword.trim()}`)
      setKeyWord('')
    } else {
      navigate('/')
    }
  }

  return (
    <Form className='d-flex' onSubmit={submitHandler}>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyWord(e.target.value)}
        value={keyword}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-light' className='p-2 mx-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
