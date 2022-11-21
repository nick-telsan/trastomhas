import { trpc } from 'core/trpc'
import React, { useRef } from 'react'

const Root = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const hello = trpc.healthcheck.useQuery()
  const createAccount = trpc.auth.signUp.useMutation()

  if (!hello.data) {
    return <div>Loading...</div>
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!(emailRef.current?.value && passwordRef.current?.value)) {
      console.error('Invalid input')
      return
    }

    createAccount.mutate({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
  }

  return (
    <div>
      <h3>{hello.data}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" ref={emailRef} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" ref={passwordRef} />
        <button type="submit">Submit</button>
      </form>

      {createAccount.data && <div>{createAccount.data.email}</div>}
    </div>
  )
}

export default Root
