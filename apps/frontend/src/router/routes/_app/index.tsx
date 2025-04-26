import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useBreadcrumbs } from '@/view/components/breadcrumbs-navbar'

export const Route = createFileRoute('/_app/')({
  component: Index,
})

function Index() {
  const { setBreadcrumbs } = useBreadcrumbs()

  useEffect(() => {
    setBreadcrumbs([{ label: 'Home' }])
  }, [setBreadcrumbs])

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}
