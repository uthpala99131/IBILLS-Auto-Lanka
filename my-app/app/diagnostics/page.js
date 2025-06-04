'use client'
import { DiagnosticForm } from '../components/diagnostics/DiagnosticForm'
import { DiagnosticResult } from '../components/diagnostics/DiagnosticResult'
import { useState } from 'react'

export default function DiagnosticsPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-black pt-25 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-red-500">AI Support For Vehicle Problem Diagnostics</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white text-black p-6 rounded-lg shadow-lg mb-8">
          <DiagnosticForm setResult={setResult} setLoading={setLoading} />
        </div>
        
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4">Analyzing your vehicle problem...</p>
          </div>
        )}
        
        {result && (
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <DiagnosticResult result={result}  />
          </div>
        )}
      </div>
    </div>
  )
}