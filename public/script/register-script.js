window.addEventListener('load', function () {
    const usernameError = document.querySelector('#username-error');
    const usernameInput = document.querySelector('#username');
    usernameInput.addEventListener('input', async () => {
        await checkUsernameInDb();
        registerButtonEnabler();
    });

    const passwordFormatError = document.querySelector(
        '#password-format-error'
    );
    const passwordMatchError = document.querySelector('#password-match-error');
    const passwordInput = document.querySelector('#password');
    const confirmPasswordInput = document.querySelector('#confirm-password');
    passwordInput.addEventListener('input', async () => {
        await checkValidPasswordFormat();
        await checkPasswordsMatch();
        registerButtonEnabler();
    });
    confirmPasswordInput.addEventListener('input', async () => {
        await checkPasswordsMatch();
        registerButtonEnabler();
    });

    const registerButton = document.querySelector('#register_button > button');

    async function checkUsernameInDb() {
        const username = usernameInput.value;
        const response = await fetch(
            `/api/check-username?username=${username}`
        );
        let data = await response.text();
        if (data === 'username exists') {
            usernameError.style.display = '';
            usernameError.innerHTML = 'Username exists, please choose another';
            return false;
        } else {
            usernameError.style.display = 'none';
            usernameError.innerHTML = '';
        }
    }

    async function checkValidPasswordFormat() {
        const password = passwordInput.value;
        const response = await fetch(`/api/validate-password-format`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });
        let data = await response.text();
        if (data === 'valid') {
            passwordFormatError.style.display = 'none';
            passwordFormatError.innerHTML = '';
            return true;
        } else {
            passwordFormatError.style.display = '';
            passwordFormatError.innerHTML =
                'Password must be at least 5 characters long and include at least 1 special character.';
            return false;
        }
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
            passwordMatchError.style.display = 'none';
            passwordMatchError.innerHTML = '';
        } else {
            passwordMatchError.style.display = '';
            passwordMatchError.innerHTML = 'Please ensure passwords match';
        }
    }

    function registerButtonEnabler() {
        if (
            usernameError.style.display === 'none' &&
            passwordFormatError.style.display === 'none' &&
            passwordMatchError.style.display === 'none'
        ) {
            registerButton.disabled = false;
            registerButton.style.opacity = "1.0";
        } else {
            registerButton.disabled = true;
            registerButton.style.opacity = "0.3";
        }
    }
});
