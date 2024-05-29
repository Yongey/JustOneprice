window.addEventListener("DOMContentLoaded", function () {
  const dropdownButton = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");

  // Adjust the left position based on the dropdown button's position
  function adjustDropdownPosition() {
    const buttonRect = dropdownButton.getBoundingClientRect();
    dropdownContent.style.left = `${buttonRect.left}px`;
  }

  // Event listener for when the dropdown is hovered
  dropdownButton.addEventListener("mouseenter", function () {
    adjustDropdownPosition();
  });

  // Event listener for window resize (adjust position if window size changes)
  window.addEventListener("resize", function () {
    adjustDropdownPosition();
  });

  // Fetch data from the API
  fetch("/api/post")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Display the data to the user
      // eslint-disable-next-line no-use-before-define
      renderPosts(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  function renderPosts(postData) {
    const postList = document.getElementById("postList");

    // Clear existing content
    postList.innerHTML = "";

    // Loop through the post data and create table rows
    postData.forEach((post) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${post.postID}</td>
        <td>${post.userID}</td>
        <td>${post.caption}</td>
        <td><img src="${post.image}" alt="Image" style="width: 250px; height: 180px;"></td>
      `;
      const deleteCell = document.createElement("td");
      const editCell = document.createElement("td");

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      // eslint-disable-next-line no-use-before-define
      deleteBtn.addEventListener("click", () => deletePost(post.postID));

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add("edit-btn");
      editBtn.addEventListener("click", () => editPost(post));

      deleteCell.appendChild(deleteBtn);
      editCell.appendChild(editBtn);

      // Append the cells to the row
      row.appendChild(deleteCell);
      row.appendChild(editCell);

      // Append the row to the table body
      postList.appendChild(row);
    });
  }
  function deletePost(postId) {
    // Ask for confirmation
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm(
      `Do you want to delete post with ID: ${postId}?`
    );

    if (confirmDelete) {
      // Perform the delete action
      fetch(`/api/post/deletePost/${postId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Display success notification
            // eslint-disable-next-line no-use-before-define
            showAlert(
              "success",
              `Successfully deleted post with ID: ${postId}`
            );

            // Optionally, you can re-fetch the updated post list or update the UI accordingly
            // ...

            // Auto-refresh the page after a short delay (you can adjust the delay as needed)
            setTimeout(() => {
              // eslint-disable-next-line no-restricted-globals
              location.reload();
            }, 1500);
          } else {
            // Display error notification
            // eslint-disable-next-line no-use-before-define
            showAlert("error", `Failed to delete post with ID: ${postId}`);
          }
        })
        .catch((error) => {
          // Display error notification
          // eslint-disable-next-line no-use-before-define
          showAlert("error", "Error deleting post. Please try again.");
          // eslint-disable-next-line no-console
          console.error("Error deleting post:", error);
        });
    }
  }

  // Function to show a notification
  function showAlert(type, message) {
    const alertContainer = document.getElementById("alert-container");
    const alert = document.createElement("div");
    alert.className = `alert ${type}`;
    alert.textContent = message;

    alertContainer.appendChild(alert);

    // Remove the alert after a delay (you can adjust the delay as needed)
    setTimeout(() => {
      alert.remove();
    }, 2000); // 3 seconds
  }

  function editPost(post) {
    // eslint-disable-next-line no-console
    console.log(`Editing post with ID: ${post.postID}`);
    // eslint-disable-next-line no-use-before-define
    openEditModal(post);
  }

  function openEditModal(post) {
    // Populate the edit modal with the post data
    document.getElementById("editCaption").value = post.caption;
    document.getElementById("editImage").value = post.image;

    // Display the edit modal
    document.getElementById("editModal").style.display = "block";
  }

  function resetEdit() {
    // Reset input fields to their initial values (optional)
    document.getElementById("editCaption").value = "";
    document.getElementById("editImage").value = "";

    // Close the edit modal
    closeEditModal();
  }
});
