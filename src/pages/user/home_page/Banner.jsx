import Image from "../../../components/image/Image";

export default function Banner(props) {
  const { img, name } = props;
  return (
    <div className="banner">
      <a href="#" className="banner-container">
        <div className="banner__img">
          <div className="img-container">
            <Image src={img} showLoading />
          </div>
        </div>
        <div className="banner__name">{name}</div>
      </a>
    </div>
  );
}
