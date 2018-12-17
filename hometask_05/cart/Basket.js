class Basket
{
    constructor(idBasket)
    {
        this.id = idBasket;

        this.countGoods = 0; //Общее кол-во товаров
        this.amount = 0; //Общая стоимость товаров
        this.basketItems = []; //Массив для хранения товаров
        this.getItems();
    }

    render($appendContainer)
    {
        let $basketDiv = $('<div />', {
            id: this.id,
            text: 'Корзина товаров'
        });

        let $basketItemsDiv = $('<div />', {
            id: this.id + '_items',
            });

        $basketItemsDiv.appendTo($basketDiv);
        $basketDiv.appendTo($appendContainer);
    }

    getItems()
    {
        let appendId = '#' + this.id + '_items';
        //let self = this; //Способ 1
        $.ajax({
            type: 'GET',
            url: './basket.json?hash=' + Math.random(),
            dataType: 'json',
            context: this,
            success: function (data) {
                console.log(data);
                let $basketData = $('<div />', {
                    id: 'basket_data'
                });

                this.countGoods = data.basket.length;
                this.amount = data.amount;

                for (let key in data.basket){
                    this.basketItems.push(data.basket[key]);
                }

                $basketData.append(`<p>Всего товаров: ${this.countGoods}</p>`);
                $basketData.append(`<p>Общая сумма: ${this.amount}</p>`);
                $basketData.appendTo(appendId);
            },
            error: function (error) {
                console.log('Что-то пошло не так', error);
            }
        });
    }

    add(idProduct, price)
    {
        let basketItem = {
            "id_product": idProduct,
            "price": price,
            //"count": 2
        };

        this.amount += price; //this.amount = this.amount + price
        this.countGoods++;
        this.basketItems.push(basketItem);

        //Перерисовываем корзину
        this.refresh();
    }

    remove(idProduct, price)
    {
        if(this.basketItems.length == 0){
            alert('Корзина пуста!');
            return;
        }
        for (var i = 0; i < this.basketItems.length; i++){
            if(this.basketItems[i].id_product == idProduct){
                this.amount -= price; //this.amount = this.amount + price
                this.countGoods--;
                this.basketItems.splice(i, 1);
                break;
            }
            if( i == this.basketItems.length - 1) alert('Такого товара ещё нет в Корзине!');
        }
        this.refresh();
    }

    refresh()
    {
        let $basketData = $('#basket_data');
        $basketData.empty();
        $basketData.append(`<p>Всего товаров: ${this.countGoods}</p>`);
        $basketData.append(`<p>Общая сумма: ${this.amount}</p>`);
    }
}