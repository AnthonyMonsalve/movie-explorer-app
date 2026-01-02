import "./FilterBar.css";

type FilterType = "" | "movie" | "series" | "episode";

type FilterBarProps = {
  type: FilterType;
  year: string;
  onTypeChange: (type: FilterType) => void;
  onYearChange: (year: string) => void;
  onReset: () => void;
  onApply: () => void;
  disabled?: boolean;
};

const FilterBar = ({
  type,
  year,
  onTypeChange,
  onYearChange,
  onReset,
  onApply,
  disabled,
}: FilterBarProps) => {
  return (
    <div className="filter-bar">
      <div className="filter-control">
        <select
          id="type"
          value={type}
          onChange={(e) => onTypeChange(e.target.value as FilterType)}
          disabled={disabled}
        >
          <option value="">Todos</option>
          <option value="movie">Películas</option>
          <option value="series">Series</option>
          <option value="episode">Episodios</option>
        </select>
      </div>

      <div className="filter-control">
        <input
          id="year"
          type="number"
          min="1900"
          max="2099"
          step="1"
          placeholder="Ej. 2024"
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="filter-actions">
        <button
          className="filter-apply"
          type="button"
          onClick={onApply}
          disabled={disabled}
        >
          Filtrar
        </button>
        <button
          className="filter-reset"
          type="button"
          onClick={onReset}
          disabled={disabled}
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
