import "./index.css"; // Import your vanilla CSS file
import { useRef } from "react";
const LeftArrow = ({ scrollPrev }) => (
  <div className="scroll-arrow left-arrow" onClick={scrollPrev}>
    &lt;
  </div>
);

const RightArrow = ({ scrollNext }) => (
  <div className="scroll-arrow right-arrow" onClick={scrollNext}>
    &gt;
  </div>
);

const ImageScrollbar = ({ photos }) => {
  const scrollMenuRef = useRef(null);

  const scrollPrev = () => {
    if (scrollMenuRef.current) {
      scrollMenuRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (scrollMenuRef.current) {
      scrollMenuRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="image-scrollbar">
      <div className="scroll-menu" ref={scrollMenuRef}>
        {photos.map((item) => (
          <div className="image-container" key={item.id}>
            <img
              src={item.url}
              alt="photos of property"
              className="property-image"
            />
          </div>
        ))}
      </div>
      <LeftArrow scrollPrev={scrollPrev} />
      <RightArrow scrollNext={scrollNext} />
    </div>
  );
};

export default ImageScrollbar;
