import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

export default function LoadingScreen() {
  const isLoaded = useAppStore((s) => s.isLoaded);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl font-bold tracking-tight text-white"
          >
            Vasilis Roumeliotis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-2 text-sm text-white/40"
          >
            AI Software Engineer
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-6 h-px w-16 origin-left bg-white/20"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
