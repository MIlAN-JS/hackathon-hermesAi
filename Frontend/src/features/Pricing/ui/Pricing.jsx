import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function PricingSection() {
  return (
    <section className="w-full bg-[#F6F7F5] py-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-semibold text-[#1B4332]">
          Simple pricing that scales with you
        </h2>
        <p className="text-gray-600 mt-4">
          Start free. Upgrade when your support volume grows.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {/* STARTER */}
        <motion.div
          variants={card}
          whileHover={{ y: -6 }}
          className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 flex flex-col"
        >
          <h3 className="text-lg font-semibold text-[#1B4332]">Starter</h3>
          <p className="text-sm text-gray-500 mt-1">For small websites</p>

          <div className="mt-6">
            <span className="text-4xl font-semibold">$0</span>
            <span className="text-gray-500"> / month</span>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-gray-600">
            <li>✔ Basic AI chatbot</li>
            <li>✔ 500 messages/month</li>
            <li>✔ Website embed</li>
            <li>✔ Email support</li>
          </ul>

          <button className="mt-8 py-3 rounded-xl border border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition">
            Get Started
          </button>
        </motion.div>

        {/* PRO (FEATURED) */}
        <motion.div
          variants={card}
          whileHover={{ y: -8 }}
          className="bg-[#1B4332] text-white rounded-2xl shadow-lg p-8 flex flex-col relative"
        >
          <span className="absolute top-4 right-4 text-xs bg-white text-[#1B4332] px-3 py-1 rounded-full">
            Most Popular
          </span>

          <h3 className="text-lg font-semibold">Growth</h3>
          <p className="text-sm text-white/70 mt-1">
            For SaaS & growing teams
          </p>

          <div className="mt-6">
            <span className="text-4xl font-semibold">$29</span>
            <span className="text-white/70"> / month</span>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-white/80">
            <li>✔ Advanced AI chatbot</li>
            <li>✔ 50,000 messages/month</li>
            <li>✔ Knowledge base training</li>
            <li>✔ Analytics dashboard</li>
            <li>✔ Priority support</li>
          </ul>

          <button className="mt-8 py-3 rounded-xl bg-white text-[#1B4332] font-medium hover:opacity-90 transition">
            Start Free Trial
          </button>
        </motion.div>

        {/* ENTERPRISE */}
        <motion.div
          variants={card}
          whileHover={{ y: -6 }}
          className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 flex flex-col"
        >
          <h3 className="text-lg font-semibold text-[#1B4332]">
            Enterprise
          </h3>
          <p className="text-sm text-gray-500 mt-1">For large organizations</p>

          <div className="mt-6">
            <span className="text-4xl font-semibold">Custom</span>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-gray-600">
            <li>✔ Unlimited usage</li>
            <li>✔ Dedicated AI tuning</li>
            <li>✔ SLA & security controls</li>
            <li>✔ Dedicated support engineer</li>
          </ul>

          <button className="mt-8 py-3 rounded-xl border border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition">
            Contact Sales
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}