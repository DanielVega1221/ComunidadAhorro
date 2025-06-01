import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import Logo from '../../assets/Logo1-removebg-preview.png';
import { CardLoginCliente } from "./Componentes/CardLoginCliente";
import { Footer } from "../../componentes/Footer";

export const ClientLogin = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (showWelcome) {
      const timeline = gsap.timeline();
      timeline
        .fromTo(
          ".welcome-screen",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
        )
        .to(".welcome-screen", {
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: "power2.in",
          delay: 2,
          onComplete: () => setShowWelcome(false),
        });
    }
  }, [showWelcome]);

  return (
    <div>
      {showWelcome ? (
        <div className="welcome-screen d-flex justify-content-center align-items-center min-vh-100">
          <h1 className="text-center text-w">
            <div className='d-flex justify-content-center align-items-center'>
              <img className="logo" style={{ width: '400px' }} src={Logo} alt="Logo" />
            </div>
          </h1>
        </div>
      ) : (
        <CardLoginCliente />
      )}

      <Footer />
    </div>
  );
};
