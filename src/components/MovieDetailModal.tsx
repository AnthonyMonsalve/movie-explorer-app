import { useEffect, useRef, useState } from "react";
import type { OmdbMovieDetailResponse } from "../api/omdbApi.ts";
import "./MovieDetailModal.css";

type MovieDetailModalProps = {
  isOpen: boolean;
  detail: OmdbMovieDetailResponse | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
};

const MovieDetailModal = ({
  isOpen,
  detail,
  isLoading,
  error,
  onClose,
}: MovieDetailModalProps) => {
  const [closing, setClosing] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setClosing(false);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!isOpen && !closing) return null;

  const fallback = (value?: string) =>
    value && value !== "N/A" ? value : "Sin datos";

  const requestClose = () => {
    setClosing(true);
    timerRef.current = window.setTimeout(() => {
      onClose();
      setClosing(false);
      timerRef.current = null;
    }, 340);
  };

  return (
    <div
      className={`modal-overlay ${closing ? "closing" : ""}`}
      role="dialog"
      aria-modal="true"
      onClick={requestClose}
    >
      <div
        className={`modal-panel ${closing ? "closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={requestClose}
          aria-label="Cerrar detalle"
        >
          ×
        </button>

        {isLoading ? (
          <div className="modal-status">Cargando detalle...</div>
        ) : error ? (
          <div className="modal-status modal-error">{error}</div>
        ) : detail ? (
          <div className="modal-content">
            <p className="eyebrow">Detalle</p>
            <div className="modal-header">
              <div className="poster preview">
                {detail.Poster && detail.Poster !== "N/A" ? (
                  <img
                    src={detail.Poster}
                    alt={`Poster de ${detail.Title}`}
                    loading="lazy"
                  />
                ) : (
                  <span className="pill">Sin poster</span>
                )}
              </div>
              <div className="header-info">
                <h2>{detail.Title}</h2>
                <p className="muted">
                  {detail.Year} · {detail.Type} · {fallback(detail.Runtime)}
                </p>
              </div>
            </div>

            <div className="modal-body">
              <div className="info-grid">
                <div>
                  <p className="label">Género</p>
                  <p>{fallback(detail.Genre)}</p>
                </div>
                <div>
                  <p className="label">Director</p>
                  <p>{fallback(detail.Director)}</p>
                </div>
                <div>
                  <p className="label">Reparto</p>
                  <p>{fallback(detail.Actors)}</p>
                </div>
                <div>
                  <p className="label">Idioma</p>
                  <p>{fallback(detail.Language)}</p>
                </div>
                <div>
                  <p className="label">País</p>
                  <p>{fallback(detail.Country)}</p>
                </div>
                <div>
                  <p className="label">Rating IMDB</p>
                  <p>{fallback(detail.imdbRating)}</p>
                </div>
              </div>

              <div>
                <p className="label">Sinopsis</p>
                <p className="plot">{fallback(detail.Plot)}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MovieDetailModal;
