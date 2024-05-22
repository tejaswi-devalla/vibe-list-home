import React, { useState } from "react";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "./ImageSlider.css";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <button className="slider-button prev" onClick={prevSlide}>
          <FaLessThan />
        </button>
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].id}
          className="slider-image"
          onClick={() => openModal(currentIndex)}
        />
        <button className="slider-button next" onClick={nextSlide}>
          <FaGreaterThan />
        </button>
      </div>
      <div className="dot-container">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <span className="close-button" onClick={closeModal}>
            <RxCross2 />
          </span>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-button prev" onClick={prevSlide}>
              <FaLessThan />
            </button>
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].id}
              className="modal-image"
            />
            <button className="modal-button next" onClick={nextSlide}>
              <FaGreaterThan />
            </button>
            <div className="dot-container modal-dot-container">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
