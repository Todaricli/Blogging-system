window.addEventListener('load', function () {
    const usernameError = document.querySelector('#username-error');
    const usernameInput = document.querySelector('#username');
    usernameInput.addEventListener('input', async () => {
        const username = usernameInput.value;
        const data = await checkUsernameInDb(username);
        if (data === 'username exists') {
            usernameError.style.display = '';
            usernameError.innerHTML = 'Username exists, please choose another';
        } else usernameError.style.display = 'none';
    });

    const passwordError = document.querySelector('#password-error');
    const passwordInput = document.querySelector('#password');
    const confirmPasswordInput = document.querySelector('#confirm-password');
    passwordInput.addEventListener('input', async () => checkPasswordsMatch());
    confirmPasswordInput.addEventListener('input', async () =>
        checkPasswordsMatch()
    );

    async function checkUsernameInDb(username) {
        let response = await fetch(`/api/check-username?username=${username}`);
        let data = await response.text();
        return data;
    }

    async function checkPasswordsMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const response = await fetch(`/api/check-passwords-match`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, confirmPassword }),
        });
        let data = await response.text();
        if (data === 'passwords match') {
            passwordError.style.display = 'none';
        } else {
            passwordError.style.display = '';
            passwordError.innerHTML = 'Please ensure passwords match';
        }
    }
});
