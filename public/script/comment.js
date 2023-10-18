window.addEventListener("load", async function () {
  verifyLogInStatus();
  displayDeleteButton();
  commentsOnArticle();
  await commentOnComment();
  await deleteComment();
});

function verifyLogInStatus() {
  const user_id = document.getElementById("user_id_temp_storage").value;

  if (!user_id) {
    console.log(user_id);
    document.getElementById("comments-div").hidden = true;
  }
}

function displayDeleteButton() {
  const deleteCommentButtons = document.querySelectorAll('.deleteCommentButton');
  deleteCommentButtons.forEach(button => {
    const commenter_id = button.nextElementSibling.value;
    const user_id = document.getElementById("user_id_temp_storage").value;
    if (commenter_id !== user_id) {
      button.hidden = true;
    }
  })
}

async function deleteComment() {
  const deleteCommentButtons = document.querySelectorAll('.deleteCommentButton');
  deleteCommentButtons.forEach(button => {
    button.addEventListener('click', async function (e) {
      e.preventDefault();
      const deleteButtonParentDiv = e.target.parentElement;
      const currentCommentDiv = deleteButtonParentDiv.parentElement;

      const comment_id = button.previousElementSibling.value;
      const article_id = document.getElementById('article_id_temp_storage').value;

      const data = {
        comment_idKey: comment_id,
        article_idKey: article_id
      }

      try {
        const response = await fetch('/api/deleteComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const responseData = await response.text();

        if (!response.ok) {
          throw new Error('Request failed with status: ' + response.status + " " + responseData);
        }

        alert(responseData);

        currentCommentDiv.remove();


      } catch (e) {
        alert(e)
      }

    })
  })
}

async function commentsOnArticle() {
  const form = document.getElementById("comment_on_article_form");

  form.addEventListener('submit', async function (e) {

    e.preventDefault();
    const content = form.querySelector('textarea').value;
    const article_id = document.getElementById('article_id_temp_storage').value;

    const formParentDiv = e.target.parentElement;
    const comments_div = formParentDiv.parentElement;

    const data = {
      contentKey: content,
      article_idKey: article_id
    }


    try {
      const response = await fetch('/api/addComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      const articleId = responseData.article_id;
      const parentId = responseData.comments_id;

      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status + " " + responseData);
      }


      // addNewCommentElement(comments_div, responseData.username, responseData.fname, responseData.lname, responseData.content, responseData.time_of_comment, responseData.id)

      alert("Comment added!");

      const textareas = document.querySelectorAll("textarea");

      textareas.forEach(textarea => {
        textarea.value = "";
      })

      // send and create notification article author
      await fetch('/api/create-new-comment-notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleId, parentId }),
    });

    } catch (e) {
      alert(e);
    }

    const directTimer = setTimeout(() => {
      window.location.assign(`/article/${article_id}`);
      clearTimeout(directTimer);
    }, 500);

  })
}

async function commentOnComment() {
  const forms = document.querySelectorAll(".comment_on_comment_form");
  console.log(forms);

  forms.forEach(await attachListenerToForm);

  async function attachListenerToForm(form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const content = form.querySelector('textarea').value
      const comment_id = form.querySelector('input[name="comment_id_storage"]').value
      const article_id = document.getElementById("article_id_temp_storage").value

      const data = {
        contentKey: content,
        comment_idKey: comment_id,
        article_idKey: article_id
      }

      const formParentDiv = e.target.parentElement;
      const comments_div = formParentDiv.parentElement;
      console.log(comments_div);

      try {
        const response = await fetch('/api/addComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log("i will print?");
        console.log(responseData);

        if (!response.ok) {
          throw new Error('Request failed with status: ' + response.status + " " + responseData);
        }

        // addNewCommentElement(comments_div, responseData.username, responseData.fname, responseData.lname, responseData.content, responseData.time_of_comment, responseData.id)

        alert("Comment added!");

        const textareas = document.querySelectorAll("textarea");

        textareas.forEach(textarea => {
          textarea.value = "";
        })


      } catch (e) {
        alert(e);
      }

      const directTimer = setTimeout(() => {
        window.location.assign(`/article/${article_id}`);
        clearTimeout(directTimer);
      }, 500);

    })
  }
}

function addNewCommentElement(parentDiv, username, fname, lname, content, time_of_comment, id) {

  const newCommentDiv = document.createElement("div");

  const username_span = document.createElement('span');
  const fname_span = document.createElement('span');
  const lname_span = document.createElement('span');
  const content_span = document.createElement('span');
  const time_span = document.createElement('span');
  const newTextareaOpener = document.createElement('button');
  const newThisCommentFormDiv = document.createElement('div')
  const newThisCommentForm = document.createElement('form');
  const newThisCommentIdStorage = document.createElement('input');
  const newThisCommentTextarea = document.createElement('textarea');
  const newThisCommentFormSubmitButton = document.createElement('button');

  username_span.innerText = username;
  fname_span.innerText = fname;
  lname_span.innerText = lname;
  content_span.innerText = content;
  time_span.innerText = time_of_comment;
  newTextareaOpener.innerText = 'Comment';
  newTextareaOpener.classList.add('textareaOpener');
  newThisCommentForm.classList.add('comment_on_comment_form');
  newThisCommentIdStorage.name = 'comment_id_storage';
  newThisCommentIdStorage.value = id;
  newThisCommentIdStorage.hidden = true;
  newThisCommentTextarea.name = 'comment_content';
  newThisCommentTextarea.placeholder = 'leave your comments here';
  newThisCommentFormSubmitButton.classList.add('commentSubmitButton');
  newThisCommentFormSubmitButton.innerText = 'Submit';

  newThisCommentForm.appendChild(newThisCommentIdStorage);
  newThisCommentForm.appendChild(newThisCommentTextarea);
  newThisCommentForm.appendChild(newThisCommentFormSubmitButton);
  newThisCommentFormDiv.appendChild(newThisCommentForm);

  newCommentDiv.appendChild(username_span);
  newCommentDiv.appendChild(fname_span);
  newCommentDiv.appendChild(lname_span);
  newCommentDiv.appendChild(content_span);
  newCommentDiv.appendChild(time_span);
  newCommentDiv.appendChild(newTextareaOpener);
  newCommentDiv.appendChild(newThisCommentFormDiv);

  parentDiv.appendChild(newCommentDiv);
}
