import React from "react";
import { Bell, Search, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <span className="hidden md:block font-medium">Sarah</span>
          </div>
        </div>
      </div>
    </header>
  );
}
