window.addEventListener(`load`, function () {

  const modal = document.querySelector(".comment")

  const openModal = function () {
    modal.classList.remove("hidden");
  };

  openComment.addEventListener("click", openModal)

  const closeModal = function () {
    modal.classList.add("hidden");
  };

  closeComment.addEventListener("click", closeModal)


  //Create effect for like button

  const likeBtn = document.querySelector(".like-btn");
  const likeIcon = document.getElementById("like-icon");

  let isLiked = false;

  likeBtn.addEventListener("click", () => {
    isLiked = !isLiked;

    if (isLiked) {
      likeIcon.classList.replace("fa-regular", "fa-solid");
      likeIcon.classList.add("liked");
    } else {
      likeIcon.classList.replace("fa-solid", "fa-regular");
      likeIcon.classList.remove("liked");
    }
  })
});
