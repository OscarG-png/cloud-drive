import Link from "next/link";
import { Cloud, Lock, Share2, Zap } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-black to-neutral-800 text-white">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <Cloud className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">Drive Clone</span>
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
      <main className="flex-1">
        <section className="flex w-full items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your Files, Anywhere, Anytime
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Drive Clone is the secure, fast, and collaborative cloud
                  storage solution for all your needs.
                </p>
              </div>
              <div className="space-x-4">
                <form
                  action={async () => {
                    "use server";
                    const session = await auth();
                    if (!session.userId) {
                      return redirect("/login");
                    }
                    return redirect("/drive");
                  }}
                >
                  <Button
                    size="lg"
                    type="submit"
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    {"Let's Get Started"}
                  </Button>
                </form>
                {/* <Button
                  variant="outline"
                  size="lg"
                  className="border-white bg-white text-black hover:bg-gray-200"
                >
                  Learn More
                </Button> */}
              </div>
            </div>
          </div>
        </section>
        <section className="flex w-full items-center justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Lock className="h-10 w-10" />
                <h2 className="text-xl font-bold">Secure Storage</h2>
                <p className="text-gray-300">
                  Your files are encrypted and protected with industry-leading
                  security measures.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Zap className="h-10 w-10" />
                <h2 className="text-xl font-bold">Lightning Fast</h2>
                <p className="text-gray-300">
                  Upload, download, and access your files with blazing speed
                  from anywhere in the world.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Share2 className="h-10 w-10" />
                <h2 className="text-xl font-bold">Easy Collaboration</h2>
                <p className="text-gray-300">
                  Share files and folders with your team or clients with just a
                  few clicks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-gray-700 px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-400">
          © 2024 Drive Clone. All rights reserved.
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
