{let n=function(){let n=$("#new-post-form");n.submit((function(s){s.preventDefault(),$.ajax({type:"post",url:"/post/create",data:n.serialize(),success:function(n){let s=t(n.data.post);$("#posts-list-container > ul").prepend(s),e($(" delete-post-button",s))},error:function(n){console.log(n.responseText)}})}))},t=function(n){return $(`<li id="post-${n._id}">\n          <p>\n             \x3c!-- if user is sign in and if user which is sign in and user who created the post --\x3e\n            \n             <small>\n                 <a class="delete-post-button" href="/post/destroy/${n._id}">X</a>\n             </small>\n             \n             ${n.content}\n             <br>\n             <small>\n             ${n.user.name}\n             </small>\n\n        <small>\n             <a class="toggle-like-button" data-likes = "0" href = "/likes/toggle/?id=${n._id} &type = Post">\n                 0 Likes\n             </a>\n        </small>     \n         </p>\n         \n        <div class="post-comments">\n             \n            <form action="/comment/create" method="POST">\n                <input type="text" name="content" placeholder="type here to add comment...">\n                 \n                <input type="hidden" name="post" value="${n._id}">\n                <input type="submit" value="Add Comment">\n            </form>\n                 \n        <div class="post-comments-list">\n                 <ul id="post-comments-${n._id}">\n                     \n                 </ul>\n             </div>\n         \n         \n        </div>\n         \n        </li>`)},e=function(n){$(n).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(n).prop("href"),success:function(n){$("#post-"+n.data.post_id).remove()},error:function(n){console.log(n.responseText)}})}))},s=function(){$("#posts-list-container>ul>li").each((function(){let n=$(this),t=$(" .delete-post-button",n);e(t);let s=n.prop("id").split("-")[1];new PostComments(s)}))};n(),s()}