import { person } from '../data/profile';

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-8">
        <p className="text-sm text-faint">
          © {new Date().getFullYear()} {person.name}
        </p>
        <p className="font-mono text-xs text-faint">Built with React, Three.js and Tailwind</p>
      </div>
    </footer>
  );
}
