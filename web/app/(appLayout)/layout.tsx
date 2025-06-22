import TestHeader from '@/components/partials/test-header'
import React from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
<TestHeader/>
{children}</body>
    </html>
  )
}
