window.addEventListener("load", function () {
    
    async function removeSubscription() {
        const removeButtons = document.querySelectorAll(".btn_unsubscription");
        removeButtons.forEach((removeBTN) => {
            removeBTN.addEventListener("click", function () {
                const rowToRemove = removeBTN.closest(".subscription_rows");
                if (rowToRemove) {
                    rowToRemove.remove();
                }
                updateSubscriptionNum();
            });
        });
    }

    function updateSubscriptionNum(){
        const numSubscription = document.querySelector("#subscription_number");
        const currentNum = parseInt(numSubscription.textContent, 10);
        if (!isNaN(currentNum) && currentNum > 2) {
            numSubscription.innerHTML = `${currentNum-1} Subscriptions`;
        } else if(!isNaN(currentNum) && currentNum > 0){
            numSubscription.innerHTML = `${currentNum-1} Subscription`;
        }
    }

    async function removeSubscriber() {
        const removeButtons = document.querySelectorAll(".btn_unsubscriber");
        removeButtons.forEach((removeBTN) => {
            removeBTN.addEventListener("click", function () {
                const rowToRemove = removeBTN.closest(".subscriber_rows");
                if (rowToRemove) {
                    rowToRemove.remove();
                }
                updateSubscriberNum();
            });
        });
    }

    function updateSubscriberNum(){
        const numSubscriber = document.querySelector("#subscriber_number");
        const currentNum = parseInt(numSubscriber.textContent, 10);
        if (!isNaN(currentNum) && currentNum > 2) {
            numSubscriber.innerHTML = `${currentNum-1} Subscribers`;
        } else if(!isNaN(currentNum) && currentNum > 0){
            numSubscriber.innerHTML = `${currentNum-1} Subscriber`;
        }
    }

    removeSubscription();
    removeSubscriber();
});