const LoadingFail = () => {
  return (
    <div className="loading-fail vertical">
      <div className="icon">
        <div className="img-container">
          <img src="/img/icon_fail.png" alt="" />
        </div>
      </div>
      <div className="loading-fail__content">
        Somethings went wrong. Please try again later!
      </div>
    </div>
  );
};

export default LoadingFail;
