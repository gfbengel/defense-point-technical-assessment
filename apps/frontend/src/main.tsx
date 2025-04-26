import './index.css'


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import { AppProviders } from './providers'
import { Toaster } from './view/components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>

      <App />
      <Toaster />

    </AppProviders>
  </StrictMode>,
)
