{

    //method to submit the form data for new post using AJAX
    
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data) {
                   let newPost = newPostDom(data.data.post); 
                   $('#posts-list-container > ul').prepend(newPost);
                   deletePost($(' delete-post-button', newPost));
                }, error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }
    





    //method to create a post in DOM
    let newPostDom = function(post) {
         return $(`<li id="post-${post._id}">
          <p>
             <!-- if user is sign in and if user which is sign in and user who created the post -->
            
             <small>
                 <a class="delete-post-button" href="/post/destroy/${post._id}">X</a>
             </small>
             
             ${post.content}
             <br>
             <small>
             ${post.user.name}
             </small>
         </p>
         
        <div class="post-comments">
             
            <form action="/comment/create" method="POST">
                <input type="text" name="content" placeholder="type here to add comment...">
                 
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
            </form>
                 
        <div class="post-comments-list">
                 <ul id="post-comments-${post._id}">
                     
                 </ul>
             </div>
         
         
        </div>
         
        </li>`);
    }

    //method to delete the Post from DOM
    let deletePost = function(deleteLink) {
        $(deleteLink).click(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                     $(`#post-${data.data.post_id}`).remove();
                }, error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }




    createPost();
}