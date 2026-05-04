import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SponsorshipForm } from "@/components/SponsorshipForm";
import { SuccessView } from "@/components/SuccessView";

const Index = () => {
  const [done, setDone] = useState(false);

  return (
    <main className="min-h-screen bg-white text-ink flex flex-col md:flex-row">
      {/* LEFT */}
      <aside className="md:w-2/5 md:sticky md:top-0 md:h-screen relative overflow-hidden bg-gradient-to-br from-soft-pink via-white to-soft-pink">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_top_left,_rgba(233,30,99,0.18),transparent_60%),radial-gradient(ellipse_at_bottom_right,_rgba(160,20,87,0.12),transparent_55%)]" />
        <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-16">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] font-bold text-hot-pink">
              Editorial · Mujeres
            </p>
          </div>
          <div className="space-y-8 max-w-md">
            <h1 className="font-serif italic text-6xl md:text-7xl text-ink leading-none tracking-tight">
              Sentirte
            </h1>
            <p className="font-serif italic text-xl md:text-2xl text-ink/80 leading-snug">
              Un espacio donde las marcas se vuelven memoria, y las mujeres, manifiesto.
            </p>
            <p className="text-sm md:text-base text-ink/70 leading-relaxed">
              Gracias por tu interés en formar parte de SENTIRTE. Este espacio reúne a marcas que buscan impactar, conectar y posicionarse desde un lugar auténtico.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-ink/60">
            <span className="h-px w-10 bg-hot-pink" />
            Patrocinios 2026
          </div>
        </div>
      </aside>

      {/* RIGHT */}
      <section className="md:w-3/5 min-h-screen p-8 md:p-16">
        <div className="max-w-[600px] mx-auto">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SuccessView />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
              >
                <header className="mb-12">
                  <p className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-hot-pink mb-4">
                    Solicitud de patrocinio
                  </p>
                  <h2 className="font-serif italic text-4xl md:text-5xl text-ink leading-tight">
                    Cuéntanos sobre tu marca.
                  </h2>
                  <p className="text-sm text-gray-500 mt-4">
                    Toma alrededor de 3 minutos. Cada respuesta nos acerca a una colaboración con sentido.
                  </p>
                </header>
                <SponsorshipForm onSuccess={() => setDone(true)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
};

export default Index;
