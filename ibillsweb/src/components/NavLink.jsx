import Link from "next/link";

const NavLink = ({ href, title, className }) => {
  return (
    <Link href={href}>
      <span className={`cursor-pointer ${className}`}>
        {title}
      </span>
    </Link>
  );
};

export default NavLink;
