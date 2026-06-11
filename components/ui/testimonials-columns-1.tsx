"use client";
import React from "react";
import { motion } from "framer-motion";

export type TTestimonial = {
  name: string;
  designation: string;
  description: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TTestimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className} style={{ overflow: "hidden" }}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5 pb-5"
      >
        {[...new Array(2)].map((_, dupIndex) => (
          <React.Fragment key={dupIndex}>
            {props.testimonials.map(({ description, name }, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 w-[280px] flex-shrink-0"
                style={{
                  background: "rgba(255,252,245,0.80)",
                  border: "1px solid rgba(180,155,115,0.22)",
                  boxShadow: "0 2px 16px rgba(150,125,90,0.10)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <p
                  style={{
                    color: "#3D3A35",
                    fontSize: "0.82rem",
                    lineHeight: 1.75,
                  }}
                >
                  {description}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold"
                    style={{
                      background: "linear-gradient(135deg, #C5A880 0%, #8C6F4B 100%)",
                      color: "#FDFBF7",
                      fontSize: "0.78rem",
                    }}
                  >
                    {name.charAt(0)}
                  </div>
                  <div
                    style={{
                      color: "#2D2820",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {name}
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
