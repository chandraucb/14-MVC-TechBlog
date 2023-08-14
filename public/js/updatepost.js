document.getElementById("updatePost").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("update_title").value.trim();
    const content = document.getElementById("update_content").value.trim();
    
    fetch('/api/posts/' + id, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(  {
            "title": title,
            "content": content
          }),
    }).then((result) => {
        if (!result.ok) {
            alert("Unable to update post");
            return;
        }

        result.json().then(() => {
            window.location = '/dashboard';
        });
    });
}); 


document.getElementById("deletePost").addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.getElementById("update_title").value.trim();
    const content = document.getElementById("update_content").value.trim();
    
    fetch('/api/posts/' + id, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
    }).then((result) => {
        if (!result.ok) {
            alert("Unable to delete post");
            return;
        }

        result.json().then(() => {
            window.location = '/dashboard';
        });
    });
});