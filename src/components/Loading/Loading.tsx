import "../../styles/Loading.css";

function Loading() {
  return (
    <div className="loading">
      <div className="spinner"></div>

      <p>Cargando clima...</p>
    </div>
  );
}

export default Loading;