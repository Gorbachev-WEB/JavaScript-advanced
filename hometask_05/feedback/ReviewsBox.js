function ReviewsBox(_src, _$parent){
    this.sourceFile = _src;
    this.reviews = [];
    this.parent = _$parent;
}
ReviewsBox.prototype.loadFromJSON = function () {
    var self = this;
    $.ajax({
        url : this.sourceFile,
        dataType : 'json',
        async : false,
        success : function (_reviews) {
            $.each(_reviews, function (i, review) {
                self.reviews.push(review);
            });
        }
    });
};
ReviewsBox.prototype.render = function(){
    this.parent.empty();
    var $div = $('<div />').addClass('ReviewsBox');
    for(var i = this.reviews.length - 1; i >= 0; i--){
        if (this.reviews[i].verified) {
            $div.append($('<div />', {'data-id' : this.reviews[i].id}).addClass('review').addClass('verified').append($('<h3 />', {text : this.reviews[i].name})).append($('<p />', {text : this.reviews[i].message})).append($('<input />', {type : 'button', value : 'Модерировать'}).addClass('moderate')).append($('<input />', {type : 'button', value : 'Удалить'}).addClass('remove')));
            continue;
        }
        $div.append($('<div />', {'data-id' : this.reviews[i].id}).addClass('review').addClass('unverified').append($('<h3 />', {text : this.reviews[i].name})).append($('<p />', {text : this.reviews[i].message})).append($('<input />', {type : 'button', value : 'Модерировать'}).addClass('moderate')).append($('<input />', {type : 'button', value : 'Удалить'}).addClass('remove')));
    }
    this.parent.append($div);
};
ReviewsBox.prototype.addReview = function (author, message) {
    this.reviews.push({
        name : author,
        message : message,
        id : this.reviews.length ? this.reviews[this.reviews.length - 1].id + 1 : 0,
        verified : false
    });
    this.render();
};
ReviewsBox.prototype.removeReview = function (reviewId) {
    for(var i = 0; i < this.reviews.length; i++){
        if(this.reviews[i].id === reviewId) {
            this.reviews.splice(i, 1);
        }
    }
    this.render();
};
ReviewsBox.prototype.moderateReview = function (reviewId) {
    for(var i = 0; i < this.reviews.length; i++){
        if(this.reviews[i].id === reviewId) {
            this.reviews[i].verified = this.reviews[i].verified ? false : true;
        }
    }
    this.render();
};
