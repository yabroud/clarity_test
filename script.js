 // Replace with your own publishable key: https://dashboard.stripe.com/test/apikeys
        // var PUBLISHABLE_KEY = 'pk_live_51J7i4cE0XibgFHnrCTcdCRtYxKNOB7ycxCncBeZW6AUNTXYfO6rg4MMTfEhNwgnkobKACksXriBKRujMUBGcsKBd00BzzDZSyR';
        var PUBLISHABLE_KEY = 'pk_test_51J7i4cE0XibgFHnrkdnbcmiEGZsPtfnfPLwdnV1eRY98g7FtVVKmmTHZHGhrpNu78X9Ycj5fQUGS5PqqYy5l0w3n00DqOJrJQC';
        // Replace with the domain you want your users to be redirected back to after payment
        var DOMAIN = location.href.replace(/[^/]*$/, '');
  
        if (PUBLISHABLE_KEY === 'pk_test_Tr8olTkdFnnJVywwhNPHwnHK00HkHV4tnP') {
          console.log(
            'Replace the hardcoded publishable key with your own publishable key: https://dashboard.stripe.com/test/apikeys'
          );
        }
  
        var stripe = Stripe(PUBLISHABLE_KEY);
  
        // Handle any errors from Checkout
        var handleResult =  function (result) {
          if (result.error) {
            var displayError =  document.getElementById('error-message');
            displayError.textContent = result.error.message;
          }
        };
  
        document.querySelectorAll('button').forEach(async function (button) {
          button.addEventListener('click', async function (e) {
              
            var mode = e.target.dataset.checkoutMode;
            var priceId = e.target.dataset.priceId;
            var items = [{ price: priceId, quantity: 1 }];

            console.log(mode)
  
            // Make the call to Stripe.js to redirect to the checkout page
            // with the sku or plan ID.
             await stripe
              .redirectToCheckout({
                mode: mode,
                lineItems: items,
                successUrl:
                  DOMAIN + 'success.html?session_id={CHECKOUT_SESSION_ID}',
                cancelUrl:
                  DOMAIN + 'canceled.html?session_id={CHECKOUT_SESSION_ID}',
              })
              .then(handleResult);
          });
        });
  