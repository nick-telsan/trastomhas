import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { AppRouter } from 'server/router'

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''

  return `http://localhost:${process.env.PORT ?? 3000}`
}
export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      /**
       * @link https://tanstack.com/query/v4/docs/reference/QueryClient
       **/
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: true,
})
