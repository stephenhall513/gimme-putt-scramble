"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="breadcrumb">
      <ul className="flex space-x-2 text-sm text-gray-500">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>
        {paths.map((path, index) => {
          const routeTo = `/${paths.slice(0, index + 1).join("/")}`;
          const name = decodeURIComponent(path).replace(/-/g, " "); // Format name

          return (
            <li key={routeTo} className="before:content-['/'] before:mx-2">
              <Link
                href={routeTo}
                className="text-blue-600 hover:underline capitalize"
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
