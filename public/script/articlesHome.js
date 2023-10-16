window.addEventListener("load", function () {
    displaySubOptionByClick();
    
    function displaySubOptionByClick() {
        const btn_option = document.querySelectorAll(".btn_sub_option");
        const user_id = document.querySelector("#current_user_id");
        btn_option.forEach(async (btn) => {
            const option = document.createElement("div");
            let isClick = 0;
            const author_id = btn.querySelector('.article_author_id');
            const btn_subscribe = btn.querySelector('.btn_subscribe');
            if (user_id.value != author_id.value) {
                const isSubscribe = await checkIfSubscribe(user_id.value, author_id.value);
                if (isSubscribe == 1) {
                    option.innerHTML = `<a href="/removeSubscription?id=${author_id.value}"><button><img src="/images/unsubscribe.png">Unsubscribe</button></a>`;
                } else if (isSubscribe == 0) {
                    option.innerHTML = `<a href="/addSubscription?id=${author_id.value}"><button><img src="/images/subscribe.png">Subscribe</button></a>`;
                }
            }
            btn_subscribe.appendChild(option);
            // btn.addEventListener("click",  function () {
            //     if (!isClick) {
            //         btn_subscribe.appendChild(option);
            //         isClick = 1;
            //     } else {
            //         btn_subscribe.removeChild(option);
            //         isClick = 0;
            //     }
            // });
            
        });
    }

    async function checkIfSubscribe(user_id, author_id) {
        const response = await fetch(`/api/checkIfSub`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, author_id }),
        });
        const isSubscribe = await response.text();
        return isSubscribe;
    }


})


