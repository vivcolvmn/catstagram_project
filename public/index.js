// Your code here
window.onload = () => {
    //header
    const h1 = document.createElement("h1");
    document.body.appendChild(h1);
    h1.innerText = "Catstagram";

    //fetch cat image from cat api
    const img = document.createElement("img");
    fetch("https://api.thecatapi.com/v1/images/search")
        .then(res => {
            return res.json();
        })
        .then(body => {
            img.src = body[0]["url"];
        })
    document.body.appendChild(img);

    //create popularity score container
    const h2 = document.createElement("h2");
    document.body.appendChild(h2);
    let score = 0;
    h2.innerText = `Pawpurrlarity Level: ${score}`;

    //create container to hold button elements
    const voteDiv = document.createElement("div");
    document.body.appendChild(voteDiv);
    voteDiv.className = "vote";
    const vote = document.getElementsByClassName("vote");

    //get new cat image button that fetches img from cat api
    const newCat = document.createElement("button");
    newCat.innerText = "🐾";
    newCat.className = "newCat";
    vote[0].appendChild(newCat);
    newCat.addEventListener("click", () => {
        fetch("https://api.thecatapi.com/v1/images/search")
            .then(res => {
                return res.json();
            })
            .then(body => {
                img.src = body[0]["url"];
            })
        score = 0;
        h2.innerText = `Pawpurrlarity Level: ${score}`;
    })

    //upvote button to increment popularity score
    const upVote = document.createElement("button");
    upVote.innerText = "😻";
    upVote.className = "upVote";
    vote[0].appendChild(upVote);
    upVote.addEventListener("click", () => {
        score += 1;
        h2.innerText = `Pawpurrlarity Level: ${score}`;
    })

    //downvote buton to decrement popularity score
    const downVote = document.createElement("button");
    downVote.innerText = "😿";
    downVote.className = "downVote";
    vote[0].appendChild(downVote);
    downVote.addEventListener("click", () => {
        score -= 1;
        h2.innerText = `Pawpurrlarity Level: ${score}`;
    })

    //open comments button, create text input, submit, and close comment elements.
    //disable open comments button to prevent multiple comment windows being created.
    const openComments = document.createElement("button");
    openComments.innerText = "💬";
    openComments.className = "openComments";
    vote[0].appendChild(openComments);

    openComments.addEventListener("click", () => {
        const commentDiv = document.createElement("div");
        commentDiv.className = "commentAdd";
        document.body.appendChild(commentDiv);
        commentDiv.innerHTML = `<span class="comment"><input type="text"
            placeholder="Add a comment..." id="commentInput"></span>
            <span class="comment"><button id="submit">Submit</button></span>
            <span class="comment"><button id="closeComments">Close Comments</button></span>`;

        openComments.disabled = true;

        //create container and list elements to hold comments
        const commentView = document.createElement("div");
        commentView.className = "commentView";
        document.body.appendChild(commentView);

        const commentsList = document.createElement("ul");
        commentsList.className = "commentsList";
        document.body.appendChild(commentsList);

        //create event listener that adds comments to list
        const commentIn = document.getElementById("commentInput");
        const submit = document.getElementById("submit");

        submit.addEventListener("click", () => {
            if (commentIn.value !== "") {
                const commentPost = document.createElement("li");
                const deleteComment = document.createElement("button")
                commentPost.innerText = `${commentIn.value}`;
                commentsList.appendChild(commentPost);
                deleteComment.innerText = "delete";
                deleteComment.className = "delete";
                commentPost.appendChild(deleteComment);
                commentIn.value = "";

                deleteComment.addEventListener("click", () => {
                    commentPost.remove();
                })
            }

        })

        //remove comment elements with close comments button
        const close = document.getElementById("closeComments");
        close.addEventListener("click", () => {
            openComments.disabled = false;
            commentDiv.remove();
            commentView.remove();
            commentsList.remove();
        })
    })

}
