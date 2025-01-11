import Link from "next/link";

export default function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-50 bg-[#0f0f0f] border-b border-[#272727]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          YouTube Clone
        </Link>
        <h1 className="text-xl font-semibold">{title}</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-red-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/playlists"
                className="hover:text-red-500 transition-colors"
              >
                Playlists
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
