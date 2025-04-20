export default function VehicleBrands() {
  const brands = [
    { name: "NISSAN", logo: "/logos/nissan.png" },
    { name: "TOYOTA", logo: "/logos/toyota.png" },
    { name: "MITSUBISHI", logo: "/logos/mitsubishi.png" },
    { name: "ISUZU", logo: "/logos/isuzu.png" },
    { name: "HONDA", logo: "/logos/honda.png" },
    { name: "DAIHATSU", logo: "/logos/daihatsu.png" },
    { name: "SUZUKI", logo: "/logos/suzuki.png" },
    { name: "TATA", logo: "/logos/tata.png" },
    { name: "ASHOK LEYLAND", logo: "/logos/ashok.png" },
    { name: "MAZDA", logo: "/logos/mazda.png" },
  ];

  return (
    <section className="py-16 bg-black">
      <div className="px-4 mx-auto max-w-7xl">
        <h3 className="mb-10 text-3xl font-bold text-center text-white">
          We Service All Brands
        </h3>
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-5">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-6 text-white transition-all duration-300 border border-red-600 shadow-lg rounded-2xl hover:bg-red-600 hover:text-black"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="object-contain h-12 mb-4"
              />
              <span className="text-lg font-semibold">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
