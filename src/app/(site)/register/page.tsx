"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import GoogleButton from "@/features/auth/GoogleButton";
import { useAuthStore } from "@/store/useAuthStore";
import { registerHero } from "@/lib/data/content";

type RegisterMethod = "email" | "phone";

export default function RegisterPage() {
  const [method, setMethod] = useState<RegisterMethod>("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      login(method === "email" ? { email } : { phone });
      router.push("/account");
    }, 500);
  };

  const handleGoogleSignUp = () => {
    login({ email: "google.user@gmail.com" });
    router.push("/account");
  };

  return (
    <div>
      <PageHero banner={registerHero} />
      <div className="max-w-md mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-center text-ink mb-6">Create an Account</h1>

          <div className="flex rounded-md border border-gray-300 p-1 mb-6">
            {(["email", "phone"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={`flex-1 text-sm font-semibold py-2 rounded-[5px] transition-colors ${
                  method === m ? "bg-ink text-white" : "text-gray-500 hover:text-ink"
                }`}
              >
                {m === "email" ? "Email" : "Phone Number"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
            </div>
            {method === "email" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input required type="tel" placeholder="+880 1XXX-XXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
            </div>
            <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-50">
              {submitting ? "Creating account..." : "Register"}
            </motion.button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">Or</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>
          <GoogleButton label="Continue with Google" onClick={handleGoogleSignUp} />

          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-dark font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
