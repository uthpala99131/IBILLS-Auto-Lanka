'use client'

export function DiagnosticResult({ result }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-red-600 mb-4">Diagnosis Results</h2>
      <div className="prose prose-sm max-w-none">
        {result.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Note: This is an AI-generated diagnosis based on your description. For accurate assessment, 
          please visit our service center for a professional inspection.
        </p>
        <button
          onClick={() => window.location.href = '/services'}
          className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Book an Inspection
        </button>
      </div>
    </div>
  )
}