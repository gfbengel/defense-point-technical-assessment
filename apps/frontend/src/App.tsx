import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { useQueryClient } from "@tanstack/react-query";


export function App() {
  const queryClient = useQueryClient()


  return (
    <RouterProvider
      router={router}
      context={{ queryClient }}
    />
  )
}
