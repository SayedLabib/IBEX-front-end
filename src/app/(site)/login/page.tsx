import { Suspense } from "react";
import LoginForm from "@/features/auth/LoginForm";

export const metadata = { title: "Sign In | IBEX" };

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
