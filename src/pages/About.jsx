// src/pages/About.jsx
import React from "react";
import { Heart, Users, BookOpen, Sparkles, Mail } from "lucide-react";

const team = [
  {
    name: "Shelli",
    role: "Frontend Developer",
    img: "",
  },
  { name: "Ruchi Pundir", role: "Designer", img: "" },
];

export default function About() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Books meet community — welcome to{" "}
              <span className="text-blue-500">Bookverse</span>
            </h1>
            <p className="mt-4 text-gray-300 max-w-xl">
              We help readers discover, collect, and share great books. Whether
              you want curated recommendations, a simple wishlist, or an easy
              way to explore new authors — we built Bookverse to make reading
              delightful again.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                <Heart size={16} /> Explore books
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-900 transition"
              >
                <Mail size={16} /> Contact us
              </a>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 p-6">
            <blockquote className="text-gray-100 italic">
              “Reading is the simplest way to expand your world. We make it
              easier to find the right book — and the right people to talk about
              it with.”
            </blockquote>
            <div className="mt-6 text-sm text-gray-400">
              — The Bookverse Team
            </div>
          </div>
        </div>

        {/* Mission & Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-900 rounded-lg">
            <h3 className="font-semibold text-lg">Our mission</h3>
            <p className="mt-3 text-gray-300 text-sm">
              Build a lightweight, human-centered reading platform that helps
              people discover books, save favorites, and share recommendations
              with friends.
            </p>
          </div>

          <div className="p-6 bg-gray-900 rounded-lg">
            <h3 className="font-semibold text-lg">What we value</h3>
            <ul className="mt-3 text-gray-300 text-sm space-y-2">
              <li>Clarity: simple UI that just works.</li>
              <li>Speed: fast search and minimal friction.</li>
              <li>Community: thoughtful sharing and discovery.</li>
            </ul>
          </div>

          <div className="p-6 bg-gray-900 rounded-lg">
            <h3 className="font-semibold text-lg">Highlights</h3>
            <ul className="mt-3 text-gray-300 text-sm space-y-2">
              <li className="flex items-center gap-2">
                <BookOpen size={14} /> Google Books integration
              </li>
              <li className="flex items-center gap-2">
                <Users size={14} /> Easy wishlist & bookmarks
              </li>
              <li className="flex items-center gap-2">
                <Sparkles size={14} /> Clean mobile-first UI
              </li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">12k+</div>
            <div className="text-sm text-gray-400">Books discovered</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">8k+</div>
            <div className="text-sm text-gray-400">Active users</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">4.9</div>
            <div className="text-sm text-gray-400">Average rating</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">1k+</div>
            <div className="text-sm text-gray-400">Wishlists created</div>
          </div>
        </div>

        {/* Team */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold">Meet the team</h2>
          <p className="text-gray-400 mt-2">
            Small team, big focus on building great reading experiences.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.map((m) => (
              <div
                key={m.name}
                className="bg-gray-900 rounded-lg p-4 flex items-center gap-4"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                  {m.img === "" ? (
                    <p className="text-gray-400 font-bold text-4xl">
                      {m.name[0]}
                    </p>
                  ) : (
                    <img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        (e.currentTarget.src = "/images/team/placeholder.jpg")
                      }
                    />
                  )}
                </div>
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-gray-400">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
