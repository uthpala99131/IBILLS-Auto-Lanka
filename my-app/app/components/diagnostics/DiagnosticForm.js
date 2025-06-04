'use client'
import { useState } from 'react' 
import { GoogleGenerativeAI } from "@google/generative-ai";



const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `As an expert auto mechanic, analyze this vehicle problem:
    
    Vehicle: ${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}
    Mileage: ${vehicleInfo.mileage || 'Unknown'}
    
    Problem Description: ${problem}
    
    Provide:
    1. Top 3 most likely causes (ordered by probability)
    2. Recommended solutions for each
    3. Urgency level (Low/Medium/High)
    4. Estimated repair cost range in LKR
    5. Whether temporary driving is possible`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setResult(text);
  } catch (error) {
    console.error('Gemini API Error:', error);
    setResult(`Error: ${error.message}. Please try again or contact support.`);
  } finally {
    setLoading(false);
  }
};

export function DiagnosticForm({ setResult, setLoading }) {
  const [problem, setProblem] = useState('')
  const [vehicleInfo, setVehicleInfo] = useState({
    make: '',
    model: '',
    year: '',
    mileage: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!problem.trim()) return
    
    setLoading(true)
    setResult(null)
    
    try {
      const prompt = `
        You are an expert automotive technician. A customer is describing a problem with their vehicle:
        
        Vehicle: ${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}
        Mileage: ${vehicleInfo.mileage || 'Unknown'}
        
        Problem Description: ${problem}
        
        Please provide:
        1. A professional analysis of the most likely causes (list top 3 possibilities)
        2. Recommended solutions for each possible cause
        3. Estimated urgency level (Low/Medium/High)
        4. Whether this is something that needs immediate attention
        5. Typical cost range for these repairs in Sri Lankan Rupees (LKR)
        
        Format your response clearly with headings for each section.
      `
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      })
      
      const data = await response.json()
      const text = data.candidates[0].content.parts[0].text
      setResult(text)
    } catch (error) {
      setResult('Error: Could not analyze the problem. Please try again later.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-red-600 mb-4">Describe Your Vehicle Problem</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Vehicle Make</label>
          <input
            type="text"
            value={vehicleInfo.make}
            onChange={(e) => setVehicleInfo({...vehicleInfo, make: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Toyota, Nissan, etc."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Model</label>
          <input
            type="text"
            value={vehicleInfo.model}
            onChange={(e) => setVehicleInfo({...vehicleInfo, model: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Corolla, Sunny, etc."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <input
            type="text"
            value={vehicleInfo.year}
            onChange={(e) => setVehicleInfo({...vehicleInfo, year: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="2015, 2020, etc."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Mileage (km)</label>
          <input
            type="text"
            value={vehicleInfo.mileage}
            onChange={(e) => setVehicleInfo({...vehicleInfo, mileage: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="50000, 120000, etc."
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Problem Description</label>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-32"
          placeholder="Describe the problem in detail (symptoms, when it occurs, any warning lights, etc.)"
          required
        />
      </div>
      
      <button
        type="submit"
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
      >
        Analyze Problem
      </button>
    </form>
  )
}