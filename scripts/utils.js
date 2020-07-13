function togglePopup(modal) {
  modal.classList.toggle("popup_opened");
  if (modal.classList.contains("popup_opened")) {
    document.addEventListener("keyup", escClose);
  } else {
    document.removeEventListener("keyup", escClose);
  };
};

function escClose(evt) {
  const openedPopup = document.querySelector(".popup_opened");

  if (evt.key === "Escape") {
    togglePopup(openedPopup);
  };
};


function showImage (link, name) {
  const displayImage = document.querySelector(".popup__image")
  const displayCaption = document.querySelector(".popup__image-caption");
  const imagePopup = document.querySelector(".popup_type_display-image");

  displayImage.src = link;
  displayImage.alt = name;
  displayCaption.textContent = name;

  togglePopup(imagePopup); 

}


export {togglePopup};
export {escClose};
export {showImage};