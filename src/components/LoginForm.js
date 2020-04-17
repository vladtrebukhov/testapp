import React from 'react';

class LoginForm extends React.Component {
    render() {
        return (
            <div className="login-form-container">
                <form className="form-container">
                    <label for="first_name_login">Username:</label>
                    <input type="text" id="first_name_login" name="first_name_login"></input>
                    <label for="password_login">Password:</label>
                    <input type="text" id="password_login" name="password_login"></input>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        )
    }

}

export default LoginForm;