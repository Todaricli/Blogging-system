window.addEventListener("load", function () {
  verifyLogInStatus();
  commentsOnArticle();
  commentOnComment();
});

function verifyLogInStatus() {
  const user_id = document.getElementById("user_id_temp_storage").value;

  if(!user_id) {
    console.log(user_id);
    document.getElementById("comments-div").hidden = true;
  }
}

function commentsOnArticle() {
  const form = document.getElementById("comment_on_article_form");

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    let textarea = document.querySelector('textarea').value;
    console.log(textarea);
  })
}

function commentOnComment() {
  const forms = document.querySelectorAll(".comment_on_comment_form");

  forms.forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      let textarea = form.querySelector('textarea').value
      let comment_id = form.querySelector('input[name="comment_id_storage"]').value
      console.log(textarea);
      console.log(comment_id);
    })
  })
}
