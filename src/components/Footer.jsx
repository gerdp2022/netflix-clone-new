import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import styles from "./Footer.module.css";

const COLUMNS = [
  ["Audio Description", "Investor Relations", "Legal Notices"],
  ["Help Centre", "Jobs", "Cookie Preferences"],
  ["Gift Cards", "Terms of Use", "Corporate Information"],
  ["Media Centre", "Privacy", "Contact Us"],
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.social}>
          <FaFacebookF />
          <FaInstagram />
          <FaTwitter />
          <FaYoutube />
        </div>

        <div className={styles.columns}>
          {COLUMNS.map((col, i) => (
            <ul key={i}>
              {col.map((item) => (
                <li key={item}>
                  <a href="#!">{item}</a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <button className={styles.serviceCode}>Service Code</button>

        <p className={styles.copyright}>© 1997-{new Date().getFullYear()} Netflix, Inc.</p>
      </div>
    </footer>
  );
}
