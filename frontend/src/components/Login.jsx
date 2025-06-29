import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { UserData } from "../context/UserContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await loginUser(data.email, data.password, navigate);
    document.getElementById("my_modal_3").close();
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
            document.getElementById("my_modal_3").close();
            navigate('/')
          }}>
          ✕
          </button>
        </form>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Login</h3>
          <p className="py-4">Enter your details</p>

          <div>
            <span>E-mail</span>
            <br />
            <label className="input validator">
              <input
                type="email"
                placeholder="mail@site.com"
                required
                {...register("email", { required: true })}
              />
            </label>
          </div>
          <br />
          <div>
            <span>Password</span>
            <br />
            <label className="input validator">
              <input
                type="password"
                placeholder="Password"
                required
                minLength="8"
                {...register("password", { required: true })}
              />
            </label>
          </div>

          <button
            disabled={btnLoading}
            className="btn btn-secondary my-[5px]"
            type="submit"
          >
            {btnLoading ? "Please wait" : "Login"}
          </button>

          <div>
            Not registered yet?{" "}
            <Link to="/register" className="text-pink-500">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Login;

