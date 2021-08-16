import Link from 'next/link';

const LoginForm = ({
    email,
    setEmail,
    password,
    setPassword,
    userLogin
}) => {
  return (
    <>
      <div className="container card authcard center-align">
        <h3>LOGIN</h3>
        <form onSubmit={(e) => userLogin(e)}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn waves-effect waves-light #1565c0 blue darken-3"
            type="submit"
          >
            login
            <i className="material-icons right">forward</i>
          </button>
          <Link href="/signup">
            <a>
              <h5>{`Don't have an account?`}</h5>
            </a>
          </Link>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
