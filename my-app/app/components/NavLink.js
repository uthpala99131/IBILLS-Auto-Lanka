// components/NavLink.jsx
"use client";
import Link from "next/link";

const NavLink = ({ href, title, className }) => {
  return (
    <Link href={href} className={className}>
      {title}
    </Link>
  );
};

export default NavLink;