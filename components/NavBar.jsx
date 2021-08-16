import cookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const NavBar = () => {
  const router = useRouter();
  const cookiesUser = parseCookies();
  const user = cookiesUser.user ? JSON.parse(cookiesUser.user) : ''

  // const user = true

  const isActive = (route) => {
    if (route === router.pathname) {
      return "active";
    } else "";
  };

  const handleLogout = () => {
    cookie.remove("token");
    cookie.remove("user")
    M.toast({ html: "Logout Success", classes: "green" });
    router.push("/login");
  };

  return (
    <>
      <nav>
        <div className="nav-wrapper #1565c0 blue darken-3">
          <Link href="/">
            <a className="brand-logo">MyStore</a>
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className={isActive("/cart")}>
              <Link href="/cart">
                <a>Cart</a>
              </Link>
            </li>
            {user.role === 'admin' || user.role === 'root' && (
              <li className={isActive("/create")}>
                <Link href="/create">
                  <a>Create</a>
                </Link>
              </li>
            )}
            {user ? (
              <>
                <li className={isActive("/account")}>
                  <Link href="/account">
                    <a>Account</a>
                  </Link>
                </li>
                <li>
                  <button className="btn red" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className={isActive("/login")}>
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </li>
                <li className={isActive("/signup")}>
                  <Link href="/signup">
                    <a>Sign up</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
