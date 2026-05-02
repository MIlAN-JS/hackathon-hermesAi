import { useState } from "react";
import { FaFacebook, FaTiktok, FaChevronLeft, FaBuilding } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
// import { googleLogin } from "../../services/auth.services.js";

const socialButtons = [
  {
    id: "facebook",
    label: "Continue with Facebook",
    icon: <FaFacebook className="text-[#1877F2]" size={24} />,
    hoverClass: "hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10",
    rippleColor: "rgba(24,119,242,0.15)",
    
  },
  {
    id: "google",
    label: "Continue with Google",
    icon: <FcGoogle size={24} />,
    hoverClass: "hover:border-white/30 hover:bg-white/10",
    rippleColor: "rgba(255,255,255,0.1)",
    onClick: () => {
      googleLogin()
    }
  },
  {
    id: "tiktok",
    label: "Continue with TikTok",
    icon: (
      <span className="relative flex items-center justify-center w-6 h-6">
        <FaTiktok size={20} className="absolute text-[#69C9D0]" style={{ transform: "translate(-1px, -1px)" }} />
        <FaTiktok size={20} className="absolute text-[#EE1D52]" style={{ transform: "translate(1px, 1px)" }} />
        <FaTiktok size={20} className="relative text-white" />
      </span>
    ),
    hoverClass: "hover:border-[#69C9D0]/50 hover:bg-[#69C9D0]/10",
    rippleColor: "rgba(105,201,208,0.15)",
  },
];


function SocialButton({ icon, label, hoverClass, onClick }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={`
        w-full flex items-center gap-4 px-5 py-[15px] rounded-xl
        border border-white/10 bg-[#2a2d35]
        text-white font-semibold text-[15px] tracking-wide
        transition-all duration-200 cursor-pointer select-none
        ${hoverClass}
        ${pressed ? "scale-[0.98] brightness-90" : "scale-100"}
        active:scale-[0.98]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
      `}
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        letterSpacing: "0.01em",
      }}
    >
      <span className="flex items-center justify-center w-7 h-7 shrink-0">{icon}</span>
      <span className="flex-1 text-center pr-7">{label}</span>
    </button>
  );
}


 function LoginComponent() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-background"
      style={{
       
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      }}
      
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none "
        // style={{
        //   background:
        //     "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(100,120,255,0.07) 0%, transparent 70%)",
        // }}
      />

      <div
        className="relative w-full max-w-[400px] mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #23262f 0%, #1c1f27 100%)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(120,130,255,0.6), rgba(100,200,220,0.4), transparent)",
          }}
        />

        <div className="px-7 pt-8 pb-8">
          {/* Back button */}
          <button
            className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors duration-150 mb-7 text-sm font-medium cursor-pointer"
            style={{ fontFamily: "inherit" }}
          >
            <FaChevronLeft size={12} />
            <span>Back</span>
          </button>

          {/* Heading */}
          <h1
            className="text-white text-[2rem] font-bold leading-tight mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            Log in or sign up
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              in seconds
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/45 text-[14px] leading-relaxed mb-8">
            Use your email or another service to continue with{" "}
            <span className="text-white/70 font-medium">Canva</span> — it's free!
          </p>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            {socialButtons.map((btn) => (
              <SocialButton
                key={btn.id}
                icon={btn.icon}
                label={btn.label}
                hoverClass={btn.hoverClass}
                onClick={btn.onClick? btn.onClick : () => {}}
               
              />
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-[1px] bg-white/10" />
            <span className="text-white/35 text-xs font-medium tracking-widest uppercase">or</span>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>

          {/* Continue another way */}
          <button
            className="w-full py-3 text-white/70 hover:text-white font-semibold text-sm tracking-wide transition-colors duration-150 cursor-pointer"
            style={{ fontFamily: "inherit" }}
          >
            Continue another way
          </button>

          {/* Terms */}
          <p className="text-white/30 text-xs leading-relaxed mt-6 mb-5">
            By continuing, you agree to Canva's{" "}
            <a href="#" className="text-[#8b8fff] hover:text-[#a9a9ff] underline transition-colors">
              Terms of Use
            </a>
            . Read our{" "}
            <a href="#" className="text-[#8b8fff] hover:text-[#a9a9ff] underline transition-colors">
              Privacy Policy
            </a>
            .
          </p>

          {/* Business signup */}
          <button
            className="flex items-center gap-2.5 text-white/45 hover:text-white/70 transition-colors duration-150 text-sm cursor-pointer"
            style={{ fontFamily: "inherit" }}
          >
            <FaBuilding size={15} className="shrink-0" />
            <span className="font-medium">Signing up for a business</span>
          </button>
        </div>
      </div>

      {/* Font import via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}

export default LoginComponent;