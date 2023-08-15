console.log(window.location.search)

if (window.location.search && window.location.search === '?hide=true') {
    document.getElementById("newcomment").style.display = "none"

} else {

    document.getElementById("addcomment").addEventListener("click", (e) => {
        e.preventDefault();

        const comment = document.getElementById("newcommenttext").value.trim();
        
        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(  {
                "comment": comment,
                "blogpost_id": blogpost_id
            }),
        }).then((result) => {
            if (!result.ok) {
                alert("Unable to create post");
                return;
            }
            result.json().then(() => {
                window.location = '/post/'+blogpost_id+'?hide=true';
            });
        });
    }); 
}