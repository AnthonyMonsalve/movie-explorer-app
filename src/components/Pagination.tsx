import "./Pagination.css";

type PaginationProps = {
  page: number;
  totalPages: number;
  totalResults?: number;
  onChange: (page: number) => void;
  disabled?: boolean;
};

const Pagination = ({
  page,
  totalPages,
  totalResults = 0,
  onChange,
  disabled,
}: PaginationProps) => {
  const handlePrev = () => {
    if (page > 1) onChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onChange(page + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={disabled || page <= 1}>
        ← <span className="label">Anterior</span>
      </button>

      <div className="pagination-info">
        <span>
          Página {page} de {totalPages}
        </span>
        {totalResults ? (
          <span className="muted">({totalResults} resultados)</span>
        ) : null}
      </div>

      <button onClick={handleNext} disabled={disabled || page >= totalPages}>
        <span className="label">Siguiente</span> →
      </button>
    </div>
  );
};

export default Pagination;
