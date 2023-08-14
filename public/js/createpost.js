document.getElementById("createPost").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("create_title").value.trim();
    const content = document.getElementById("create_content").value.trim();
    
    fetch('/api/posts', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(  {
            "title": title,
            "content": content
          }),
    }).then((result) => {
        if (!result.ok) {
            alert("Unable to create post");
            return;
        }

        result.json().then(() => {
            window.location = '/dashboard';
        });
    });
}); 