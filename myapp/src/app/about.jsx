// app/about.jsx
export default function About() {
    return (
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-red-700">About IBILLS</h2>
        <p className="text-lg text-gray-700 leading-8">
          IBILLS is a trusted name in car repair services. We combine technology and experience
          to deliver the best automotive care in the industry. Our trained professionals offer
          precision diagnostics, expert maintenance, and transparent pricing.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="border p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold text-red-600">10+ Years Experience</h3>
            <p>We've been helping vehicle owners for over a decade.</p>
          </div>
          <div className="border p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold text-red-600">Certified Mechanics</h3>
            <p>Every mechanic is certified and trained for quality service.</p>
          </div>
          <div className="border p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold text-red-600">Thousands of Clients</h3>
            <p>We’ve served thousands of satisfied customers.</p>
          </div>
        </div>
      </section>
    );
  }
  