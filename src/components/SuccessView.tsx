import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function SuccessView() {
  const phone = "5215555555555";
  const message = encodeURIComponent("Hola, acabo de enviar mi solicitud de patrocinio para SENTIRTE.");
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex min-h-[60vh] flex-col items-center justify-center text-center"
    >
      <p className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-hot-pink mb-6">
        Solicitud recibida
      </p>
      <h2 className="font-serif italic text-4xl md:text-5xl text-ink text-center mb-4 leading-tight">
        Estás a punto de formar parte de algo grande.
      </h2>
      <p className="text-center text-gray-600 mb-10 max-w-md">
        Hemos recibido tu información. Nuestro equipo está evaluando tu perfil.
      </p>
      <a
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white hover:bg-[#1DA851] rounded-full px-8 py-4 flex items-center justify-center gap-2 font-bold shadow-lg animate-pulse transition-colors"
      >
        <MessageCircle className="h-5 w-5" />
        Hablar por WhatsApp ahora
      </a>
      <p className="text-sm text-gray-500 italic mt-8">
        Te contactaremos en menos de 48 horas.
      </p>
    </motion.div>
  );
}