"use client";
import { useEffect, useState } from "react";
import Link from 'next/link'
import Image from "next/image";
import {
  AlertCircle,
  AlertTriangle,
  BookHeart,
  Eye,
  Lock,
  User,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("")

      const response = await fetch("http://localhost:5000/login",{
        method: "POST",
         credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
      throw new Error(data.message);
    }
    console.log(data);
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  };
  return (
    <div>
      <div className="bg-[#FDF6F0] text-[#2D2020] flex px-8 pt-12 pb-6 flex-col items-center h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="relative shadow-[0_8px_30px_rgba(180,100,100,0.12)] ring-4 ring-[#FFFAF8] rounded-3xl w-44 h-44 overflow-hidden">
            <Image
              alt="Open journal with pressed flowers"
              className="object-cover w-full h-full"
              data-authorname="Kelly Sikkema"
              data-authorurl="https://unsplash.com/@kellysikkema"
              data-blurhash="LMBf@Px]00M_NGWBsnW=V@WBkWxa"
              data-photoid="W98pobBsBPY"
              src="/static1.jpg"
              fill={true}
            />
            <div className="bg-linear-to-t from-[#F4A7B9]/30 via-transparent to-[#FADADD]/20 absolute inset-0" />
          </div>
        </div>
        <div className="flex mt-6 flex-col items-center gap-1 w-full">
          <h1 className="leading-none font-serif font-semibold text-[#2D2020] text-[32px] tracking-tight">
            Daybook
          </h1>
          <p className="font-light text-[#A07070] text-[13px] mt-1">
            Your shared journal, just the two of you.
          </p>
        </div>
        <div className="shadow-[0_8px_20px_rgba(180,100,100,0.08)] rounded-3xl bg-[#FFFAF8] flex mt-8 p-4 flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <div className="rounded-xl bg-white border-[#E07070] border border-solid flex px-3 items-center gap-2 h-13">
              <User className="size-5 shrink-0 text-[#E8909A]" />

              <input
                className="bg-transparent outline-none text-[#2D2020] text-[15px] flex-1"
                defaultValue="alex123"
                placeholder="Email or Username"
                type="email"
                onChange={(e) => {
                  setLogin(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="rounded-xl bg-white border-[#F4C5C5] border border-solid flex px-3 items-center gap-2 h-13">
            <Lock className="size-5 shrink-0 text-[#E8909A]" />
            <input
              className="bg-transparent outline-none text-[#2D2020] text-[15px] flex-1"
              placeholder="Password"
              type={showPass ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Eye
              onClick={() => {
                setShowPass(!showPass);
              }}
              className="size-5 shrink-0 text-[#E8909A]"
            />
          </div>
          <div className="flex justify-end">
            <a className="font-medium text-[#D4687A] text-xs">
              Forgot password?
            </a>
          </div>
          {error && (
            <div className="flex pl-1 items-center gap-1">
              <AlertTriangle className="size-3 text-[#C0504A]" />
              <span className="text-[#C0504A] text-[11px]">
                {error}
              </span>
            </div>
            )}
          <Button onClick={handleLogin} className="bg-linear-to-r from-[#E8909A] to-[#D4687A] shadow-[0_8px_20px_rgba(212,104,122,0.35)] font-bold rounded-[14px] text-white text-[15px] border-black/1 border-0 border-solid w-full h-13">
            Sign in
          </Button>
          <div className="flex py-1 items-center gap-4">
            <div className="bg-[#F4C5C5] flex-1 h-px" />
            <span className="text-[#A07070] text-xs">or</span>
            <div className="bg-[#F4C5C5] flex-1 h-px" />
          </div>
          <Link href="/signup">
          <Button
            className="bg-transparent font-semibold rounded-[14px] text-[#D4687A] text-[15px] border-[#F4C5C5] border border-solid w-full h-12"
            variant="outline"
          >
            <BookHeart className="size-4 mr-2" />
           Signup
          </Button>
          </Link>
        </div>
        <div className="flex-1" />
        <p className="text-center text-[#A07070] text-[11px] tracking-wide mt-8">
          Private. Intimate. Just for two.
        </p>
      </div>
    </div>
  );
}
