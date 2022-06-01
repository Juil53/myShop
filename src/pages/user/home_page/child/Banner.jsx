export default function Banner(props) {
  const { img, name } = props;
  return (
    <div className="banner">
      <a href="#" className="banner-container">
        <div className="banner__img">
          <div className="img-container">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="banner__name">{name}</div>
      </a>
    </div>
  );
}
