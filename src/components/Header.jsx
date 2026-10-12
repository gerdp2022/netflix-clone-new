import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";
import logo from "../assets/image/logo.png";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "TV Shows", to: "/tv-shows" },
  { label: "Movies", to: "/movies" },
  { label: "New & Popular", to: "/new-popular" },
  { label: "My List", to: "/my-list" },
  { label: "Browse by Language", to: "/browse-language" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.left}>
        <img src={logo} alt="Netflix" className={styles.logo} />
        <nav className={styles.nav}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.right}>
        <div className={`${styles.searchBox} ${searchOpen ? styles.searchOpen : ""}`}>
          <FiSearch className={styles.icon} onClick={() => setSearchOpen((s) => !s)} />
          {searchOpen && (
            <input
              type="text"
              placeholder="Titles, people, genres"
              autoFocus
              className={styles.searchInput}
            />
          )}
        </div>

        <div className={styles.bellWrap}>
          <FiBell className={styles.icon} />
          <span className={styles.bellDot} />
        </div>

        <div className={styles.profile} ref={dropdownRef} onClick={() => setDropdownOpen((d) => !d)}>
          <div className={styles.avatar} />
          <FiChevronDown className={`${styles.caret} ${dropdownOpen ? styles.caretUp : ""}`} />

          {dropdownOpen && (
            <div className={styles.dropdown}>
              <button>Account</button>
              <button>Help Center</button>
              <hr />
              <button>Sign out of Netflix</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
