import { motion } from "framer-motion";

export default function Mascot({ state = "idle" }) {
  const statusText = {
    idle: "Sistema listo",
    thinking: "Analizando estructura lingüística",
    success: "Traducción completada",
    error: "Error de procesamiento",
  };

  return (
    <div className="robot-card">
      <div className="robot-status-bar">
        <span className={`robot-status-dot ${state}`}></span>
        <span className="robot-status-text">{statusText[state]}</span>
      </div>

      <motion.div
        className="robot-shell"
        animate={
          state === "thinking"
            ? { y: [0, -4, 0] }
            : state === "success"
            ? { scale: [1, 1.04, 1] }
            : state === "error"
            ? { rotate: [0, -2, 2, -2, 0] }
            : {}
        }
        transition={{
          duration: 0.8,
          repeat: state === "thinking" ? Infinity : 0,
        }}
      >
        <div className="robot-antenna">
          <motion.span
            className={`robot-antenna-light ${state}`}
            animate={
              state === "thinking"
                ? { opacity: [0.4, 1, 0.4] }
                : state === "success"
                ? { opacity: [0.6, 1, 0.6] }
                : state === "error"
                ? { opacity: [1, 0.3, 1] }
                : { opacity: 0.8 }
            }
            transition={{
              duration: 0.8,
              repeat: state === "idle" ? 0 : Infinity,
            }}
          />
        </div>

        <div className={`robot-head ${state}`}>
          <div className="robot-ear left"></div>
          <div className="robot-ear right"></div>

          <div className="robot-face">
            <motion.div
              className="robot-eyes"
              animate={
                state === "thinking"
                  ? { x: [0, 3, -3, 0] }
                  : state === "success"
                  ? { scale: [1, 1.05, 1] }
                  : {}
              }
              transition={{
                duration: 1,
                repeat: state === "thinking" ? Infinity : 0,
              }}
            >
              <span className={`robot-eye ${state}`}></span>
              <span className={`robot-eye ${state}`}></span>
            </motion.div>

            <motion.div
              className={`robot-mouth ${state}`}
              animate={
                state === "thinking"
                  ? { width: [28, 38, 28] }
                  : state === "success"
                  ? { scaleX: [1, 1.1, 1] }
                  : state === "error"
                  ? { opacity: [1, 0.5, 1] }
                  : {}
              }
              transition={{
                duration: 0.8,
                repeat: state === "thinking" ? Infinity : 0,
              }}
            />
          </div>
        </div>

        <div className="robot-body">
          <div className="robot-panel">
            <span className={`robot-panel-light ${state}`}></span>
            <span className={`robot-panel-light ${state}`}></span>
            <span className={`robot-panel-light ${state}`}></span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}