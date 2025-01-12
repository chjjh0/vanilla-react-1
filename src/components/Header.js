import { h } from "@/libs/h";
import { Link } from "@/router/router";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            {/* <a href="/">Home</a> */}
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/counter">Counter</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
