import { Image } from "react-bootstrap";

const Img = (props) => {
  const { photo, lastImage, endOfPage } = props;
  return (
    <div>
      <Image
        src={photo.urls.regular}
        alt=""
        className="unblur"
        onLoad={lastImage ? endOfPage : null}
        fluid
      />
    </div>
  );
};

export default Img;
