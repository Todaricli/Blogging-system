window.addEventListener("load", function () {
    async function displaySubOption() {
        const user_id = document.querySelector("#user_id");
        console.log(user_id);
        const profile_id = document.querySelector('#profile_id');
        const profile_related_info = document.querySelector('#profile_related_info');




        if ((user_id.value != profile_id.value) && user_id.value != null) {
            const option = document.createElement("button");

            const subOption = document.createElement("button")
            subOption.innerHTML = `<img src="/images/subscribe.png">Subscribe`;
            subOption.addEventListener(`click`, (e) => {
                addSubscription(subscription_id);
                subOption.style.display = "none"
                unsubOption.style.display = "block"
            })

            const unsubOption = document.createElement("button")
            unsubOption.innerHTML = `<img src="/images/unsubscribe.png">Unsubscribe`;
            unsubOption.addEventListener(`click`, (e) => {
                removeSubscription(subscription_id);
                subOption.style.display = "block"
                unsubOption.style.display = "none"
            })

            option.setAttribute("class", "subscribe-button");
            unsubOption.setAttribute("class", "subscribe-button");
            subOption.setAttribute("class", "subscribe-button");
            const isSubscribe = await checkIfSubscribe(user_id.value, profile_id.value);
            const subscription_id = profile_id.value;
            if (isSubscribe == 1) {
                // option.innerHTML = `<img src="/images/unsubscribe.png">Unsubscribe`;
                // option.addEventListener("click", function () {
                //     removeSubscription(subscription_id);
                // });
                unsubOption.style.display = "block"
                subOption.style.display = "none"
            } else if (isSubscribe == 0) {
                // option.innerHTML = `<img src="/images/subscribe.png">Subscribe`;
                // option.addEventListener("click", function () {
                //     addSubscription(subscription_id);
                // });
                unsubOption.style.display = "none"
                subOption.style.display = "block"
            }
            // profile_related_info.appendChild(option);

            profile_related_info.appendChild(unsubOption);
            profile_related_info.appendChild(subOption);
        }

    }

    async function checkIfSubscribe(user_id, check_id) {
        const response = await fetch(`/api/checkIfSub`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, check_id }),
        });
        const isSubscribe = await response.text();
        return isSubscribe;
    }

    async function removeSubscription(subscription_id) {
        const subscriptionId = subscription_id;
        await fetch(`/removeSubscription?id=${subscriptionId}`)
            .then(response => {
                if (response.status === 200) {
                    // location.reload();
                } else {
                    console.error('Error removing subscription');
                }
            })
            .catch(error => {
                console.error('Network error:', error);
            });
    }

    async function addSubscription(subscription_id) {
        const subscriptionId = subscription_id;
        await fetch(`/addSubscription?id=${subscriptionId}`)
            .then(response => {
                if (response.status === 200) {
                    // location.reload();
                } else {
                    console.error('Error removing subscription');
                }
            })
            .catch(error => {
                console.error('Network error:', error);
            });
    }

    displaySubOption();

})
