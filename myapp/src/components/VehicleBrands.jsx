export default function VehicleBrands() {
  const brands = ["Toyota", "Ford", "BMW", "Mercedes", "Honda"];
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-6 text-center">We Service All Brands</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {brands.map((brand, idx) => (
            <div key={idx} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
