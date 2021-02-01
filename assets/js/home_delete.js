{
    let createComment = function() {
        let newCommentForm = $('#new-comment-form');
        
        newCommentForm.submit(function(e) {
            e.preventDefault();
        });
    }
}