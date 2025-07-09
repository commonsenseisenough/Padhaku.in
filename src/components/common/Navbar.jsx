import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Images/Logo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  /* ──────────────────────────── Redux state ──────────────────────────── */
  const { token }     = useSelector((state) => state.auth);
  const { user }      = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  /* ──────────────────────────── Local state ──────────────────────────── */
  const location            = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [loading,  setLoading]  = useState(false);

  /* ──────────────────────────── Fetch categories once ────────────────── */
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data || []);
      } catch (err) {
        /* eslint-disable no-console */
        console.error("Could not fetch categories:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ──────────────────────────── Helpers ──────────────────────────────── */
  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  /* categories that actually have courses */
  const visibleCategories = subLinks;

  /* ──────────────────────────── Render ───────────────────────────────── */
  return (
    <div
      className={`flex h-14 items-center justify-center border-b border-gray-800 ${
        location.pathname !== "/" ? "bg-gray-900" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* ─────────── Logo ─────────── */}
       <Link to="/" className="flex items-center space-x-2">
  <img
    src={logo}
    alt="Logo"
    className="h-10 w-40 object-contain"
    loading="lazy"
  />
  <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-rose-500 to-fuchsia-500
 text-transparent bg-clip-text italic">
    ᴘᴀᴅʜᴀᴋᴜ.ɪɴ
  </span>
</Link>



        {/* ─────────── Desktop nav links ─────────── */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-gray-300">
            {NavbarLinks.map((link, idx) => (
              <li key={idx} className="relative group">
                {link.title === "Catalog" ? (
                  /* ▼  Catalog with dropdown */
                  <>
                    <button
                      type="button"
                      className={`flex items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-300"
                          : "text-gray-300"
                      }`}
                    >
                      {link.title} <BsChevronDown />
                    </button>

                    {/* Dropdown container */}
                    <div className="absolute left-1/2 top-full z-50 hidden w-56 -translate-x-1/2 translate-y-2 flex-col rounded-lg bg-gray-50 p-4 text-gray-900 opacity-0 shadow-md transition-all duration-200 group-hover:flex group-hover:opacity-100 lg:w-72">
                      {/* Tail for dropdown box */}
                      <div className="absolute left-1/2 top-0 -z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-50" />

                      {loading && (
                        <p className="text-center text-sm">Loading…</p>
                      )}

                      {!loading && visibleCategories.length === 0 && (
                        <p className="text-center text-sm">No Courses Found</p>
                      )}

                      {!loading &&
                        visibleCategories.map((cat) => (
                          <Link
                              key={cat._id}
                              to={`/catalog/${cat.name.replace(/[\s/]+/g, "-").toLowerCase()}`}
                              className="rounded-lg py-2 px-3 hover:bg-gray-100"
                            >
                              {cat.name}
                          </Link>

                        ))}
                    </div>
                  </>
                ) : (
                  /* Regular single-page links */
                  <Link to={link.path}>
                    <p
                      className={
                        matchRoute(link.path) ? "text-yellow-300" : "text-gray-300"
                      }
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ─────────── Right-side actions ─────────── */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-gray-200" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-gray-600 text-xs font-bold text-yellow-400">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {!token && (
            <>
              <Link to="/login">
                <button className="rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-gray-200">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-gray-200">
                  Sign up
                </button>
              </Link>
            </>
          )}

          {token && <ProfileDropdown />}
        </div>

        {/* ─────────── Mobile menu button ─────────── */}
        <button className="mr-4 md:hidden">
          <AiOutlineMenu className="text-2xl text-[#AFB2BF]" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
