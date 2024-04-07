"use client";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <div className="bg-slate-950/90 p-2 border-b border-b-slate-900 sticky top-0 z-50 backdrop-blur-md">
      <nav className="flex flex-1 items-center justify-between w-full md:w-auto py-2 px-8 sm:px-8">
        <Link href="/">
          <Image
            className="h-8 w-auto sm:h-8"
            height={200}
            width={200}
            src="https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg"
            alt=""
          />
        </Link>

        <div className="space-x-6 sm:flex md:ml-10 items-center">
          <Link
            key="courses"
            href="/home"
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-colors bg-slate-950 rounded-md px-3 py-2 hover:bg-slate-800 ring-1 ring-slate-800"
          >
            Available Courses
          </Link>
        </div>
      </nav>
    </div>
  );
}
