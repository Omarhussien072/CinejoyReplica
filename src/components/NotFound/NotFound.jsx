import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
import magicPill from '../Navbar/Navbar'
export default function NotFound() {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden">

            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-150 h-150 bg-zinc-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: [0.2, 0.8, 0.2, 0.4, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="mb-8"
                >
                    <svg
                        className="text-zinc-600 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        width="140"
                        height="140"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                        <line x1="7" y1="2" x2="7" y2="22"></line>
                        <line x1="17" y1="2" x2="17" y2="22"></line>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <line x1="2" y1="7" x2="7" y2="7"></line>
                        <line x1="2" y1="17" x2="7" y2="17"></line>
                        <line x1="17" y1="17" x2="22" y2="17"></line>
                        <line x1="17" y1="7" x2="22" y2="7"></line>
                    </svg>
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 drop-shadow-lg">
                    404
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold text-zinc-300 mb-6">
                    Scene Missing
                </h2>
                <p className="text-zinc-500 max-w-md mb-10 text-sm md:text-base leading-relaxed">
                    The content you are looking for has been cut from the final edit, or the reel is broken. Let's get you back to the main feature.
                </p>

                <NavLink onClick={magicPill} to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                        Back to Home
                    </motion.button>
                </NavLink>
            </div>

            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat"></div>
        </div>
    );
}