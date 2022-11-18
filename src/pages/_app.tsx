import { trpc } from 'core/trpc'
import type { AppType } from 'next/app'

const App: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}
export default trpc.withTRPC(App)
