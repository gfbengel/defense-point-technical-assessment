import { createFileRoute } from '@tanstack/react-router'

import { AppLayout } from '@/view/layouts/app-layout'


export const Route = createFileRoute('/_app')({
  component: AppLayout,
  beforeLoad: () => {
  },
})
