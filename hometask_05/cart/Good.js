class Good
{
    constructor(id, title, price)
    {
        this.id = id;
        this.title = title;
        this.price = price;
    }

    render($appendContainer){
        let $goodContainer = $('<div />', {
            class: 'good'
        });

        let $goodTitle = $('<p />', {
            text: this.title
        });

        let $goodPrice = $(`<p>Цена: <span>${this.price}</span> руб.</p>`);

        let $goodBtn = $('<button />', {
           class: 'buy-good',
           'data-id': this.id,
           text: 'Купить'
        });

        let $delBtn = $('<button />', {
            class: 'remove-good',
            'data-id': this.id,
            text: 'Убрать'
        });

        //Объединяем элементы в структуру
        $goodTitle.appendTo($goodContainer);
        $goodPrice.appendTo($goodContainer);
        $goodBtn.appendTo($goodContainer);
        $delBtn.appendTo($goodContainer);

        $appendContainer.append($goodContainer);
    }
}