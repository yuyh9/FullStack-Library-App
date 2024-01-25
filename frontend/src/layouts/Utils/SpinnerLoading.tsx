export const SpinnerLoading = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ marginTop: "-200px", height: "550px" }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
