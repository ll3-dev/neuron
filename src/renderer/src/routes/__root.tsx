import { ErrorComponentProps, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: GlobalNotFound,
  notFoundComponent: NotFound
})

function RootComponent() {
  return <Outlet />
}

function GlobalNotFound({ error, info }: ErrorComponentProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-3xl font-bold">404 - Not Found</h1>
      <p className="text-red-500 mt-2">{error.message}</p>
      <pre className="text-gray-500 mt-2">{info?.componentStack}</pre>
    </div>
  )
}

function NotFound() {
  const url = new URL(window.location.href)

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <h1 className="text-3xl font-bold">404 - Not Found</h1>
      <p className="text-red-500 mt-2">
        The requested URL <code>{url.pathname}</code> was not found
      </p>
    </div>
  )
}
