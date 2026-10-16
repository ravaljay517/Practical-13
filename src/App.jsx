
import React, { useState } from "react";
import {
  HashRouter,
  MemoryRouter,
  StaticRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

function Home() {
  return (
    <div className="rounded-xl bg-indigo-50 p-5">
      <h3 className="text-xl font-bold text-indigo-900">Home Page</h3>
      <p className="mt-2 text-slate-600">
        Welcome to the React Router practical.
      </p>
    </div>
  );
}

function About() {
  return (
    <div className="rounded-xl bg-emerald-50 p-5">
      <h3 className="text-xl font-bold text-emerald-900">About Page</h3>
      <p className="mt-2 text-slate-600">
        This page demonstrates router navigation.
      </p>
    </div>
  );
}

function Contact() {
  return (
    <div className="rounded-xl bg-amber-50 p-5">
      <h3 className="text-xl font-bold text-amber-900">Contact Page</h3>
      <p className="mt-2 text-slate-600">
        You are viewing the contact page.
      </p>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="mb-5 flex flex-wrap gap-3">
      <Link className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white" to="/">
        Home
      </Link>
      <Link className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white" to="/about">
        About
      </Link>
      <Link className="rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white" to="/contact">
        Contact
      </Link>
    </nav>
  );
}

function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="*"
        element={<p className="text-red-600">Page not found.</p>}
      />
    </Routes>
  );
}

function LocationInfo() {
  const location = useLocation();

  return (
    <div className="mt-5 rounded-xl bg-slate-100 p-4">
      <p className="text-sm font-semibold text-slate-500">
        Current pathname
      </p>
      <p className="mt-1 break-all font-mono text-indigo-700">
        {location.pathname}
      </p>
    </div>
  );
}

function HashDemo() {
  return (
    <HashRouter>
      <Navigation />
      <PageRoutes />
      <LocationInfo />
      <p className="mt-4 rounded-lg bg-indigo-50 p-3 text-sm text-indigo-900">
        HashRouter navigation changes the URL after the # symbol.
      </p>
    </HashRouter>
  );
}

function MemoryDemo() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Navigation />
      <PageRoutes />
      <LocationInfo />
      <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">
        MemoryRouter stores navigation history in memory. The browser URL
        does not change.
      </p>
    </MemoryRouter>
  );
}

function StaticDemo() {
  const location = useLocation();

  return (
    <div>
      <p className="rounded-xl bg-violet-50 p-5 text-violet-900">
        StaticRouter renders a fixed location. Current pathname:{" "}
        <strong>{location.pathname}</strong>
      </p>
      <p className="mt-3 text-sm text-slate-600">
        It is intended for server-side rendering and does not provide
        interactive browser navigation.
      </p>
    </div>
  );
}

function StaticPanel() {
  return (
    <StaticRouter location="/about">
      <StaticDemo />
    </StaticRouter>
  );
}

const routerInfo = {
  HashRouter: {
    use: "Static hosting when server-side route fallback is unavailable.",
    detail: "Uses the URL hash, such as /#/about.",
  },
  MemoryRouter: {
    use: "Automated tests, embedded apps and non-browser environments.",
    detail: "Keeps the route history in memory, not in the address bar.",
  },
  StaticRouter: {
    use: "Server-side rendering and rendering a fixed URL.",
    detail: "Uses a fixed location and does not navigate interactively.",
  },
};

export default function App() {
  const [selected, setSelected] = useState("HashRouter");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-indigo-700 px-5 py-8 text-white shadow-lg">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
            React Practical
          </p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Router Types
          </h1>
          <p className="mt-3 text-indigo-100">
            HashRouter · MemoryRouter · StaticRouter
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <section className="grid gap-4 md:grid-cols-3">
          {Object.entries(routerInfo).map(([name, info]) => (
            <button
              key={name}
              onClick={() => setSelected(name)}
              className={`rounded-2xl border p-5 text-left transition hover:-translate-y-1 ${
                selected === name
                  ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                  : "border-slate-200 bg-white hover:border-indigo-300"
              }`}
            >
              <h2 className="text-lg font-bold">{name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {info.detail}
              </p>
            </button>
          ))}
        </section>

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="mb-5 text-2xl font-extrabold">{selected} Demo</h2>

          {selected === "HashRouter" && <HashDemo />}
          {selected === "MemoryRouter" && <MemoryDemo />}
          {selected === "StaticRouter" && <StaticPanel />}

          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <h3 className="font-bold">Where can it be used?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {routerInfo[selected].use}
            </p>
          </div>
        </section>

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <h2 className="text-xl font-extrabold">Comparison</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[550px] text-left text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3">Router</th>
                  <th className="p-3">Location storage</th>
                  <th className="p-3">Use case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-semibold">HashRouter</td>
                  <td className="p-3">URL hash</td>
                  <td className="p-3">Static hosting</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">MemoryRouter</td>
                  <td className="p-3">In memory</td>
                  <td className="p-3">Testing and embedded apps</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">StaticRouter</td>
                  <td className="p-3">Fixed location</td>
                  <td className="p-3">Server rendering</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-500">
        React Router Types Practical · Tailwind CSS
      </footer>
    </div>
  );
}
