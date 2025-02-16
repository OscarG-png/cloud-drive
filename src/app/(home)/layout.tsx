import Link from "next/link";
import { Cloud } from "lucide-react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-black to-neutral-800 text-white">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <Cloud className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">Turbo Drive</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-gray-700 px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-400">
          © 2025 Turbo Drive. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
