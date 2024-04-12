import React from 'react'
import { LayoutWithDrawerComponent } from '../shared/layout/layoutWithDrawer.component'
import { SendToEpolicComponent } from '../components/sendToEpolicComponent'

export const AddInSurancePage = () => {
  return (
    <LayoutWithDrawerComponent>
      <SendToEpolicComponent />
    </LayoutWithDrawerComponent>
  )
}
