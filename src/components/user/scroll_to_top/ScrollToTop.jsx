const ScrollToTop = () => {
  const calcScrollValue = () => {
    const scrollProgress = document.getElementById("progress");
    const scrollProgressValue = document.getElementById("progress-value");

    let position = document.documentElement.scrollTop;
    let calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    let scrollValue = Math.round((position * 100) / calcHeight);

    if (position > 100) {
      scrollProgress.style.display = "grid";
    } else {
      scrollProgress.style.display = "none";
    }

    scrollProgress.style.background = `conic-gradient(#2cced4 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
  };

  const handleScrollToTop = () => {
    document.documentElement.scrollTop = 0;
  };

  window.onscroll = calcScrollValue;
  window.onload = calcScrollValue;

  return (
    <div className="scroll" id="progress" onClick={handleScrollToTop}>
      <span className="scroll__value" id="progress-value">
        <i className="fa-solid fa-arrow-up"></i>
      </span>
    </div>
  );
};

export default ScrollToTop;
