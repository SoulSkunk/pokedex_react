import "../App.css";

function Header() {
  return (
    <div className="Header">
      <header className="bg-zinc-900">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <div className="flex-1 flex flex-col  md:flex-row md:items-center md:gap-4">
              {/* The h1 is hidden on small screens and centered vertically on medium+ screens */}
              <h1 className="hidden md:block text-4xl font-bold text-gray-800 tracking-wide bg-gradient-to-r from-gray-200 to-red-600 bg-clip-text text-transparent">
                Pokedex
              </h1>

              <a className="block text-teal-600" href="#">
                <img src="logo_svg.svg" alt="logo pokeball" />
              </a>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <div className="w-full max-w-xs">
                    <select
                      id="language-select"
                      className="block w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-lg"
                    >
                      <option value="fr">French (🇫🇷)</option>
                      <option value="ko">Korean (🇰🇷)</option>
                      <option value="ja">Japanese (🇯🇵)</option>
                      <option value="du">German (🇩🇪)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
