import '../app/globals.css';

export default function VehicleService() {
  const packages = [
    {
      title: 'Basic Maintenance',
      image: '/packages/pack1.jpg',
      description: 'Oil change, filter replacement, fluid top-up.',
    },
    {
      title: 'Full Service',
      image: '/packages/pack2.jpg',
      description: 'Complete vehicle check-up with diagnostics.',
    },
    {
      title: 'Engine Tune-Up',
      image: '/packages/pack3.jpg',
      description: 'Improve engine performance and fuel efficiency.',
    },
    {
      title: 'Brake Service',
      image: '/packages/pack4.jpg',
      description: 'Brake pad replacement and system inspection.',
    },
    {
      title: 'AC Repair',
      image: '/packages/pack5.jpg',
      description: 'Cooling issues fixed and system recharged.',
    },
    {
      title: 'Premium Detailing',
      image: '/packages/pack6.jpg',
      description: 'Interior & exterior full clean and polish.',
    },
  ];

  return (
    <main className="flex-grow w-full px-6 py-20 mx-auto text-white bg-black max-w-7xl">
      <h2 className="mb-12 text-4xl font-bold text-center text-red-600">Vehicle Service Packages & Promotions</h2>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="text-white transition-shadow duration-300 bg-black border border-red-600 shadow-md rounded-xl hover:shadow-red-600/40"
          >
            <div className="flex items-center justify-center p-4">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="object-contain w-full h-auto max-h-72"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="mb-2 text-xl font-bold text-red-500">{pkg.title}</h3>
              <p className="text-base text-white">{pkg.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
