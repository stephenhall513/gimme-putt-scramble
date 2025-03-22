import LoginForm from "@/components/Authentication/LoginForm";
import SiteHeader from "@/components/SiteHeader/SiteHeader";

const LoginPage = () => {
  return (
    <div>
      <SiteHeader />
      <div className="p-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
