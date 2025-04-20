export default function VehicleBrands() {
  const brands = ["Toyota", "Ford", "BMW", "Mercedes", "Honda"];

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold mb-10 text-center text-white">
          We Service All Brands
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="border border-red-600 text-white p-6 rounded-2xl shadow-lg hover:bg-red-600 hover:text-black transition-all duration-300"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
