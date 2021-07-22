$(document).ready(function () {

    $.ajax({
        url: "https://frenchless.herokuapp.com/checkout-test",
        beforeSend: function (xhr) {

            let loading = `<img
                            src="loading.gif"
                            width="150"
                            height="150"
                            />`

            $("#checkoutSection-list").html(loading)

        }
    }).done(function (response) {

        // $.get("https://frenchless.herokuapp.com/checkout-test", function (response) {

            var checkoutSection = "<table class ='styled-table'><thead> <tr><th>Name</th> <th>Amount</th> <th>Currency</th> <th>Payment</th> <th>Country</th> </tr> </thead> <tbody>"

            $.each(response.data, function (index, item) {

                let payment = ''
                if (item.description === 'Subscription creation') {
                    payment = 'Month'
                } else {
                    payment = 'Once'
                }

                var censorWord = function (str) {
                    return str[0] + str[1] + "*".repeat(str.length - 2) +str[str.length - 1] ;
                }
                var censorEmail = function (email) {
                    var arr = email.split("@");
                    return censorWord(arr[0]) + "@" + arr[1];
                }



                checkoutSection += `<tr><td> ${censorEmail(item.billing_details.email)}</td> <td>${item.amount / 100}</td> <td>${item.currency}</td><td>${payment}</td><td>${item.billing_details.address.country}</td> </tr>`;
            })
            checkoutSection += `</tbody> </table>`

            $("#checkoutSection-list").html(checkoutSection)

        // })
    });
})