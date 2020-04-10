import React from 'react'
import './App.css'
import DebtsTable from './DebtsTable'

export default function App() {
  return (
    <div style={{ padding: '1.5rem' }} >
      <div >
        <h2 style={{ textAlign: 'center' }}>Strategic Financial Solutions</h2>
        <DebtsTable />
      </div>
    </div>
  )
}
