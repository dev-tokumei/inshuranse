import React from 'react'
import { HomeComponent } from '../components/home.component'
import { LayoutWithDrawerComponent } from '../shared/layout/layoutWithDrawer.component'

export const HomePage = () => {
  return (
    <LayoutWithDrawerComponent>
      <HomeComponent />
    </LayoutWithDrawerComponent>
  )
}
