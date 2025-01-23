let btn = document.getElementById("payButton")
//let language = navigator.language //or fix
let language = "ru-RU"

function pay() {
  var widget = new cp.CloudPayments({
    language: language
  })
  widget.pay('charge',
    {
      publicId: 'pk_d256a7d3dc5420frefrfrefr1', // api_key из order`а
      description: 'Пробный Тариф', // Название приобретаемого продукта (product.name)
      amount: 1, // Сумма оплаты из ордера (amount)
      currency: 'RUB', // валюта из ордера (currency)
      accountId: '1', // id юзера (user.id)
      invoiceId: '5', // id созданного order`а (id)
      skin: "modern", // пусть остается так
      email: 'dinirr122@yandex.ru', // email юзера (user.email)
      autoClose: 3 // время, через которое закрывается виджет после оплаты (можно как-то настроить, чтобы было недолго)
    }, {
      onSuccess: function(options) { // success
        //действие при успешной оплате
      },
      onFail: function(reason, options) { // fail
        //действие при неуспешной оплате
      },
      onComplete: function(paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
        //например вызов вашей аналитики Facebook Pixel
      }
    }
  )
}

//window.addEventListener('load', pay)
btn.addEventListener('click', pay)