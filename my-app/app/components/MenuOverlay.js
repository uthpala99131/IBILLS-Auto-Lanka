import Link from "next/link";

const MenuOverlay = ({ links, children }) => {
  return (
    <div className="px-4 pt-4 pb-6 space-y-4 text-white bg-black md:hidden">
      {links.map((link, index) => (
        <Link key={index} href={link.path} className="block hover:text-red-500">
          {link.title}
        </Link>
      ))}

      {/* Inject additional items like auth buttons */}
      {children}
    </div>
  );
};

export default MenuOverlay;
