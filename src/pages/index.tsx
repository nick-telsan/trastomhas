import { trpc } from 'core/trpc'
import React, { useRef } from 'react'

const Root = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const hello = trpc.healthcheck.useQuery()
  const input = trpc.mutationCheck.useMutation()

  if (!hello.data) {
    return <div>Loading...</div>
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputRef.current?.value) {
      console.error('Invalid input')
      return
    }

    input.mutate({ text: inputRef.current.value })
  }

  return (
    <div>
      <h3>{hello.data}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Type a word</label>
        <input id="input" ref={inputRef} />
        <button type="submit">Submit</button>
      </form>

      {input.data && <div>{input.data}</div>}
    </div>
  )
}

export default Root
