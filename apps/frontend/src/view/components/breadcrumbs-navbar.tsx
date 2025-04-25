'use client'

import * as React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/view/components/ui/breadcrumb'

type BreadcrumbItemType = {
  label: string
  url?: string
}

export interface BreadcrumbsContextValue {
  breadcrumbs: BreadcrumbItemType[]
  setBreadcrumbs: (breadcrumbs: BreadcrumbItemType[]) => void
}

const BreadcrumbsContext = React.createContext<BreadcrumbsContextValue | null>(
  null,
)

export function useBreadcrumbs() {
  const context = React.useContext(BreadcrumbsContext)
  if (!context) {
    throw new Error('useBreadcrumbs must be used within a SidebarProvider.')
  }

  return context
}

export function BreadcrumbsProvider({
  children,
}: { children: React.ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbItemType[]>([
    { label: 'Home', url: '/' },
  ])

  return (
    <BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbsContext.Provider>
  )
}

export function BreadcrumbsNavbar() {
  const { breadcrumbs } = useBreadcrumbs()

  if (breadcrumbs.length === 0) {
    return null
  }

  const [first, ...rest] = breadcrumbs

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={first.url}>{first.label}</BreadcrumbLink>
        </BreadcrumbItem>
        {rest.map((breadcrumb) => (
          <BreadcrumbItemFormatted
            label={breadcrumb.label}
            url={breadcrumb.url}
            key={breadcrumb.url + breadcrumb.label}
          />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function BreadcrumbItemFormatted({ label, url }: BreadcrumbItemType) {
  if (url !== undefined) {
    return (
      <>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={url}>{label}</BreadcrumbLink>
        </BreadcrumbItem>
      </>
    )
  }

  return (
    <>
      <BreadcrumbSeparator className="hidden md:block" />
      <BreadcrumbItem>
        <BreadcrumbPage>{label}</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  )
}
