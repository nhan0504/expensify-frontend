"user-client";

import { LoginButton } from "../buttons/login";
import { FormInput } from "../input/formInput";
import "./style.css";

export function LoginForm() {
  return (
    <div className="backdrop-blur-sm bg-black/30 styled-login-form rounded-3xl">
      <form>
        <FormInput type={"text"} text={"Username"} />
        <FormInput type={"password"} text={"Password"} />
      </form>
      <LoginButton />
    </div>
  );
}
