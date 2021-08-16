import Link from 'next/link';

const SignupForm = ({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    userSignup
}) => {
  return (
    <>
      <div className="container card authcard center-align">
        <h3>SignUP</h3>
        <form onSubmit={(e) => userSignup(e)}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            signup
            <i className="material-icons right">forward</i>
          </button>
          <Link href="/login">
            <a>
              <h5>Already have an account ?</h5>
            </a>
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
