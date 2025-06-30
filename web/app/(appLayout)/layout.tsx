import TestHeader from '@/components/partials/test-header'
import React from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <TestHeader />
        {children}
      </div>
    </div>
  )
}
