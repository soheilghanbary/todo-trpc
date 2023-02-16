import { useTheme } from "next-themes";
import Image from "next/image";
import styles from "~/lib/sass/navbar.module.scss";
import Icon from "../atoms/icon";
function Navbar() {
  return (
    <nav className={styles["navbar"]}>
      <Logo />
      <NavButtons />
    </nav>
  );
}

function Logo() {
  return (
    <div className={styles["logo"]}>
      <Image width={36} height={36} alt={'logo'} loading="lazy" src="https://trpc.io/img/logo.svg" />
      <h3>Todino</h3>
    </div>
  );
}

function NavButtons() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return (
    <div className={styles["nav-buttons"]}>
      <button onClick={toggleTheme}>
        <Icon name="moon" />
      </button>
      <button onClick={toggleTheme}>
        <Icon name="user" />
      </button>
    </div>
  );
}

export default Navbar;
