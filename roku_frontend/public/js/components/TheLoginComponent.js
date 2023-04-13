export default {
    name: 'TheLoginComponent',
    template: 
        `<section class="container">
        <div class="jumbotron11">
            <h1 class="loginh1">Welcome to Flashblack!</h1>
        </div>

        <section class="log-in">
        <!-- username input -->
        <label class="label1" for="inlineFormInputName">Username</label>
        <input ref="username" v-model="username" type="text" class="form-control" id="inlineFormInputName" required>

        <label   class="label1" for="inlineFormPassword">Password</label>
        <input ref="password" v-model="password" type="password" class="form-control" id="inlineFormPassword"  required>
        </section>

        <!-- login button -->
        <div class="login-submit11">
            <button
            @click="tryLogin"
                type="submit" 
                class="btn btn-primary login-submit"
            >Login
            </button>

        <!-- sign up button -->
            <button v-on:click="trySignUp" class="btn btn-primary login-submit">Sign Up</button>
        </div>

    </section>
    `,

    data() {
        return {
            username: '',
            password: ''
        }
    },

    methods: {
        trySignUp(){

            console.log('sign up button clicked');
            debugger;


           },
        tryLogin() {
            // debugger;
            // sanitize our inputs, make sure they're not empty ect "       "
            if (this.username.trim().length == 0) { 
                console.log('username input is empty');
                this.$refs['username'].classList.add('field-error');
                return; //exits the login function
            }

            if (this.password.trim().length == 0) { 
                console.log('password input is empty');
                this.$refs['password'].classList.add('field-error');
                return; 
            }

            this.$refs['username'].classList.remove('field-error');
            this.$refs['password'].classList.remove('field-error');

            // end input validation

            let userData = {
                username: this.username,
                password: this.password
            }


            // for login, we need to send the user's credentials to the server
            fetch('/ums/login', {
                method: "POST",
                headers:{
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'

                },
                body: JSON.stringify(userData)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if(data.message == "no user") {
                    // turn the signup button on in the template, set some kind of data to control it's appearance in the UI
                    // you can add a new route to post a user to the database -> some kind of "sign-up" pathway
                    this.signup = true;
                }

                // check for broken password
                if (data.message == "wrong password") {
                    this.$refs['password'].classList.add('field-error');
                    // change the label to reflect the error
                    // animate something to tell the user there's a problem
                    // record some profanity and play it now!
                    this.$refs['password'].placeholder = "wrong password!";
                }

                // if there's a user in the data object, that means we've successfully logged in
                // the user has been validated
                if (data.user) {
                    
                    // let the app know this user is valid and can have access to everything
                    this.$emit('setauthenticated');

                    // store the user in localStorage
                    window.localStorage.setItem('user', JSON.stringify(data.user));

                    // send the user to the all users page
                    this.$router.push({name: 'allusers'});
                }
            })
            .catch(error => console.error(error));
        }
    }
}