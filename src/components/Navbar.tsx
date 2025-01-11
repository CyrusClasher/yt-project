"use client";

import { Menu, Search, Bell, Video, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0f0f0f] border-b border-[#272727]">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:bg-[#272727]">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OL4H6fXTrQtviml9Jlj2Yyr0KlpJXL.png"
              alt="YouTube Logo"
              width={90}
              height={20}
              className="w-auto h-5"
            />
            <span className="text-xs text-gray-400 align-top">IN</span>
          </div>
        </div>

        <div className="flex items-center gap-4 max-w-[720px] w-full">
          <div className="flex flex-1">
            <div className="flex-1 flex items-center">
              <Input
                type="search"
                placeholder="Search"
                className="rounded-r-none bg-[#121212] border-[#303030] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="rounded-l-none bg-[#222222] hover:bg-[#303030] px-6 border border-l-0 border-[#303030]">
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 hover:bg-[#272727]"
            >
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-[#272727]">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-[#272727]">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-[#272727]">
            <div className="w-8 h-8 rounded-full bg-[#ff0000] flex items-center justify-center">
              <span className="text-sm font-medium">A</span>
            </div>
          </Button>
        </div>
      </div>
    </nav>
  );
}
