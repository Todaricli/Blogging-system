window.addEventListener('load', async function () {
    const registerButton = document.querySelector('#register_button > button');
    const passwordEye = document.querySelector('#passwordEye');
    // input selectors
    const nameInput = document.querySelector('#name');
    const usernameInput = document.querySelector('#username');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const confirmPasswordInput = document.querySelector('#confirm-password');
    const formInputs = [
        nameInput,
        usernameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
    ];
    // error selectors
    const usernameError = document.querySelector('#username-error');
    const passwordFormatError = document.querySelector(
        '#password-format-error'
    );
    const passwordMatchError = document.querySelector('#password-match-error');

    await windowsOnLoadChecks();
    await addFormVerificationListeners();
    addFormInputAnimationListeners();
    togglePasswordVisibility();

    async function addFormVerificationListeners() {
        usernameInput.addEventListener('input', async () => {
            await checkUsernameInDb();
            registerButtonEnabler();
        });
        passwordInput.addEventListener('input', async () => {
            await checkValidPasswordFormat();
            await checkPasswordsMatch();
            registerButtonEnabler();
        });
        confirmPasswordInput.addEventListener('input', async () => {
            await checkPasswordsMatch();
            registerButtonEnabler();
        });
    }

    async function checkUsernameInDb() {
        const username = usernameInput.value;
        const response = await fetch(
            `/api/check-username?username=${username}`
        );
        let data = await response.text();
        if (data === 'username exists') {
            usernameError.style.display = '';
            usernameError.innerHTML =
                'Username exists, please choose another';
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
            registerButton.style.opacity = '1.0';
        } else {
            registerButton.disabled = true;
            registerButton.style.opacity = '0.3';
        }
    }

    function addFormInputAnimationListeners() {
        formInputs.forEach(function (input) {
            input.addEventListener('input', function () {
                checkIfInputFocused(input);
            });
        });
    }

    function checkIfInputFocused(input) {
        const label = input.nextElementSibling;
        if (input.value && input.value.trim() !== '') {
            label.classList.add('focused-label');
            label.classList.remove('label');
            input.style.borderBottomColor = 'black';
        } else {
            label.classList.remove('focused-label');
            label.classList.add('label');
            input.style.borderBottomColor = '#cecece';
        }
    }

    function togglePasswordVisibility() {
        passwordEye.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordEye.src = '/images/svg/eye-fill.svg';
            } else {
                passwordInput.type = 'password';
                passwordEye.src = '/images/svg/eye.svg';
            }
        });
    }

    async function windowsOnLoadChecks() {
        formInputs.forEach(async (input) => {
            checkIfInputFocused(input);
        });
        await checkUsernameInDb();
        await checkValidPasswordFormat();
        await checkPasswordsMatch();
        registerButtonEnabler();
    }
});
