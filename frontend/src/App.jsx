import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { translateText } from "./services/translatorApi";
import Mascot from "./components/Mascot";

export default function App() {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [error, setError] = useState("");
  const [mascotState, setMascotState] = useState("idle");
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  const normalizeTokens = (value) => {
    if (Array.isArray(value)) return value;

    if (typeof value === "string") {
      return value
        .split(/[\s,]+/)
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  const translatedWordsCount = useMemo(() => {
    if (!translation) return 0;

    return translation
      .split(/\s+/)
      .map((item) => item.trim())
      .filter(Boolean).length;
  }, [translation]);

  const analysisStatus = useMemo(() => {
    if (!translation) return "Sin análisis disponible";
    if (unknownWords.length === 0) return "Análisis completo";
    return "Requiere revisión parcial";
  }, [translation, unknownWords]);

  const confidence = useMemo(() => {
    if (!translation) return 0;
    const base = 100;
    const penalty = unknownWords.length * 18;
    return Math.max(60, base - penalty);
  }, [translation, unknownWords]);

  const recognizedWords = useMemo(() => {
    return Math.max(tokens.length - unknownWords.length, 0);
  }, [tokens, unknownWords]);

  const lexicalCoverage = useMemo(() => {
    if (!tokens.length) return 0;
    return Math.round((recognizedWords / tokens.length) * 100);
  }, [recognizedWords, tokens]);

  const saveToHistory = ({
    input,
    output,
    tokensCount,
    unknownCount,
    confidenceValue,
  }) => {
    const newItem = {
      id: crypto.randomUUID(),
      input,
      output,
      tokensCount,
      unknownCount,
      confidenceValue,
      time: new Date().toLocaleTimeString(),
    };

    setHistory((prev) => [newItem, ...prev].slice(0, 6));
  };

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError("Debes escribir un texto para traducir.");
      setTranslation("");
      setTokens([]);
      setUnknownWords([]);
      setElapsedMs(0);
      setMascotState("error");

      setTimeout(() => {
        setMascotState("idle");
      }, 1500);

      return;
    }

    try {
      setLoading(true);
      setError("");
      setCopied(false);
      setMascotState("thinking");

      const start = Date.now();
      const result = await translateText(text);
      const rawElapsed = Date.now() - start;

      const minimumDuration = 900;
      if (rawElapsed < minimumDuration) {
        await new Promise((resolve) =>
          setTimeout(resolve, minimumDuration - rawElapsed)
        );
      }

      const normalizedTokens = normalizeTokens(result.tokens);
      const normalizedUnknown = normalizeTokens(result.unknownWords);
      const translatedText = result.translation || "";
      const finalElapsed = Math.max(rawElapsed, minimumDuration);
      const finalConfidence = Math.max(60, 100 - normalizedUnknown.length * 18);

      setTranslation(translatedText);
      setTokens(normalizedTokens);
      setUnknownWords(normalizedUnknown);
      setElapsedMs(finalElapsed);
      setMascotState("success");

      saveToHistory({
        input: text,
        output: translatedText,
        tokensCount: normalizedTokens.length,
        unknownCount: normalizedUnknown.length,
        confidenceValue: finalConfidence,
      });

      setTimeout(() => {
        setMascotState("idle");
      }, 1800);
    } catch (err) {
      setError(err.message || "Ocurrió un error al traducir.");
      setTranslation("");
      setTokens([]);
      setUnknownWords([]);
      setElapsedMs(0);
      setMascotState("error");

      setTimeout(() => {
        setMascotState("idle");
      }, 1800);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setTranslation("");
    setError("");
    setTokens([]);
    setUnknownWords([]);
    setElapsedMs(0);
    setCopied(false);
    setMascotState("idle");
  };

  const handleCopy = async () => {
    if (!translation) return;

    try {
      await navigator.clipboard.writeText(translation);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1400);
    } catch {
      setError("No se pudo copiar la traducción.");
    }
  };

  const handleUseHistoryItem = (item) => {
    setText(item.input);
    setTranslation(item.output);
    setCopied(false);
    setError("");
  };

  const handleDeleteHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const fillExample = (value) => {
    setText(value);
    setError("");
  };

  return (
    <div className="app-shell">
      <div className="background-glow glow-1"></div>
      <div className="background-glow glow-2"></div>
      <div className="background-glow glow-3"></div>

      <main className="app-container">
        <header className="hero">
          <span className="hero-badge">
            UNIVERSIDAD DE CARTAGENA--CIPA TRES.
          </span>

          <h1>Traductor Español → Palenquero</h1>

          <p className="hero-subtitle">
            Plataforma académica para traducción, tokenización y análisis
            lingüístico inteligente.
          </p>
        </header>

        <section className="top-grid">
          <section className="mascot-card card">
            <div className="mascot-top-status">
              <span className={`status-dot ${mascotState}`}></span>
              <span>
                {mascotState === "thinking"
                  ? "Analizando"
                  : mascotState === "success"
                  ? "Completado"
                  : mascotState === "error"
                  ? "Atención"
                  : "Sistema listo"}
              </span>
            </div>

            <div className="mascot-card-content">
              <div className="mascot-visual">
                <Mascot state={mascotState} />
              </div>

              <div className="mascot-bubble">
                <h3>Asistente lingüístico</h3>
                <p>
                  Te ayudo a traducir texto del español al palenquero y a
                  revisar cómo se procesa cada entrada.
                </p>
                <p>
                  Escribe una frase, presiona <strong>Traducir</strong> y
                  analiza tokens, palabras reconocidas y cobertura léxica.
                </p>
              </div>
            </div>

            <div className="assistant-status-box">
              <h4>Estado del análisis</h4>

              <div className="legend-row">
                <span className="legend-item">
                  <i className="legend-dot blue"></i> Listo
                </span>
                <span className="legend-item">
                  <i className="legend-dot yellow"></i> Analizando
                </span>
                <span className="legend-item">
                  <i className="legend-dot green"></i> Completado
                </span>
                <span className="legend-item">
                  <i className="legend-dot red"></i> Atención
                </span>
              </div>

              <div className="assistant-note">
                🔎 Si existen términos no reconocidos, se marcarán para revisión
                manual.
              </div>
            </div>
          </section>

          <section className="translator-card card">
            <div className="card-header">
              <h2>Texto de entrada</h2>
              <span className="counter-text">{text.length}/2000</span>
            </div>

            <textarea
              value={text}
              onChange={(e) => {
                if (e.target.value.length <= 2000) {
                  setText(e.target.value);
                }
              }}
              placeholder="Escribe aquí tu texto en español..."
              rows={8}
              className="translator-textarea"
            />

            <div className="examples-row">
              <button
                type="button"
                className="example-chip"
                onClick={() => fillExample("Hola, ¿cómo estás?")}
              >
                Hola, ¿cómo estás?
              </button>
              <button
                type="button"
                className="example-chip"
                onClick={() => fillExample("El agua es vida")}
              >
                El agua es vida
              </button>
              <button
                type="button"
                className="example-chip"
                onClick={() => fillExample("Quiero aprender palenquero")}
              >
                Quiero aprender palenquero
              </button>
            </div>

            <div className="translator-actions">
              <div className="button-group">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "tween", duration: 0.15 }}
                  onClick={handleTranslate}
                  disabled={loading}
                  className="primary-btn"
                >
                  <span className="button-icon">✈</span>
                  <span>{loading ? "Traduciendo..." : "Traducir"}</span>
                </motion.button>

                <button
                  onClick={handleClear}
                  disabled={loading}
                  className="secondary-btn"
                >
                  <span className="button-icon">⟳</span>
                  <span>Limpiar</span>
                </button>
              </div>

              <p className="input-helper">
                💡 Ingresa una frase o párrafo corto para obtener la traducción
                y el análisis.
              </p>

              {error && <p className="error-text">{error}</p>}
            </div>
          </section>
        </section>

        <section className="middle-grid">
          <section className="result-card card">
            <div className="result-header">
              <h2>Resultado</h2>
              <div className="result-header-right">
                <span className="result-tag">Lengua Palenquera</span>
                <button
                  className="copy-btn"
                  onClick={handleCopy}
                  disabled={!translation}
                >
                  {copied ? "Copiado" : "Copiar"}
                </button>
              </div>
            </div>

            <motion.div
              key={translation || "empty"}
              className="result-box"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {translation ? (
                <div className="translation-wrapper">
                  <p className="translation-text">
                    {translation}
                    {loading && <span className="cursor">|</span>}
                  </p>

                  <div className="loading-row">
                    <span
                      className={`live-dot ${loading ? "active" : ""}`}
                    ></span>
                    <span>
                      {loading ? "Traduciendo..." : "Traducción lista"}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="placeholder-text">
                  Aquí aparecerá la traducción generada por el sistema.
                </p>
              )}
            </motion.div>

            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-top">
                  <span className="metric-label">Tokens detectados</span>
                  <span className="metric-icon blue">◫</span>
                </div>
                <strong className="metric-value">{tokens.length}</strong>
              </div>

              <div className="metric-card">
                <div className="metric-top">
                  <span className="metric-label">No reconocidas</span>
                  <span className="metric-icon yellow">△</span>
                </div>
                <strong className="metric-value">{unknownWords.length}</strong>
              </div>

              <div className="metric-card">
                <div className="metric-top">
                  <span className="metric-label">Traducidas</span>
                  <span className="metric-icon green">✓</span>
                </div>
                <strong className="metric-value">{translatedWordsCount}</strong>
              </div>

              <div className="metric-card">
                <div className="metric-top">
                  <span className="metric-label">Tiempo</span>
                  <span className="metric-icon purple">◌</span>
                </div>
                <strong className="metric-value">
                  {elapsedMs ? `${elapsedMs} ms` : "--"}
                </strong>
              </div>
            </div>

            <div className="confidence-card">
              <div className="confidence-header">
                <span>Confianza de traducción</span>
                <span className="confidence-percent">{confidence}%</span>
              </div>

              <div className="confidence-bar">
                <div
                  className="confidence-fill"
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>

              <div className="confidence-scale">
                <span>Baja</span>
                <span>Traducción confiable</span>
                <span>Alta</span>
              </div>
            </div>
          </section>

          <section className="analysis-card card">
            <div className="analysis-header">
              <h2>Análisis Lingüístico</h2>
              <span className="analysis-badge">Motor NLP</span>
            </div>

            <div className="analysis-status-row">
              <span className="analysis-status-pill">{analysisStatus}</span>
            </div>

            <div className="analysis-kpis">
              <div className="analysis-kpi">
                <span className="analysis-kpi-label">Reconocidas</span>
                <strong className="analysis-kpi-value">
                  {recognizedWords}
                </strong>
              </div>

              <div className="analysis-kpi">
                <span className="analysis-kpi-label">Cobertura léxica</span>
                <strong className="analysis-kpi-value">
                  {tokens.length ? `${lexicalCoverage}%` : "--"}
                </strong>
              </div>
            </div>

            <div className="analysis-section">
              <h3>Tokens ({tokens.length})</h3>

              <div className="tokens-container">
                {tokens.length > 0 ? (
                  tokens.map((token, index) => (
                    <motion.span
                      key={`${token}-${index}`}
                      className="token-chip"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      {token}
                    </motion.span>
                  ))
                ) : (
                  <p className="placeholder-text">No hay tokens</p>
                )}
              </div>
            </div>

            <div className="analysis-section">
              <h3>Palabras no reconocidas ({unknownWords.length})</h3>

              <p className="analysis-helper-text">
                Términos que no fueron encontrados directamente en el
                diccionario base.
              </p>

              <div className="tokens-container">
                {unknownWords.length > 0 ? (
                  unknownWords.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      className="token-chip unknown"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      {word}
                    </motion.span>
                  ))
                ) : (
                  <span className="success-pill">
                    Sin palabras no reconocidas
                  </span>
                )}
              </div>
            </div>

            <div className="analysis-summary-box">
              <div className="summary-icon">✓</div>
              <div>
                <strong>
                  {unknownWords.length === 0
                    ? "Todo el texto fue procesado correctamente."
                    : "El texto fue procesado con observaciones."}
                </strong>
                <p>
                  {unknownWords.length === 0
                    ? "No se encontraron términos que requieran revisión manual."
                    : "Revisa las palabras no reconocidas para validar la interpretación final."}
                </p>
              </div>
            </div>
          </section>
        </section>

        <section className="history-card card">
          <div className="history-header">
            <h2>Historial de traducciones</h2>

            <button
              className="history-clear-btn"
              onClick={handleClearHistory}
              disabled={history.length === 0}
            >
              Limpiar historial
            </button>
          </div>

          <div className="history-list">
            {history.length > 0 ? (
              history.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-item-main">
                    <strong className="history-input">{item.input}</strong>
                    <span className="history-time">{item.time}</span>
                  </div>

                  <div className="history-meta">
                    <span>Tokens: {item.tokensCount}</span>
                    <span>Desconocidas: {item.unknownCount}</span>
                    <span>Confianza: {item.confidenceValue}%</span>
                  </div>

                  <div className="history-actions">
                    <button
                      className="history-action-btn"
                      onClick={() => handleUseHistoryItem(item)}
                    >
                      Usar
                    </button>

                    <button
                      className="history-action-btn danger"
                      onClick={() => handleDeleteHistoryItem(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="placeholder-text">
                Aún no hay traducciones en el historial.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}