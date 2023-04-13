export default {
    name: 'TheUserComponent',

    // passing username and avatar from the parent component
    

    props: ['user'],

    template: `
    <div @click="NavToHome" class="bg-info rounded-circle">
        <div class="card-body text-center">
            <img :src='"images/" + user.avatar' class="image_avatar" alt="user avatar">
        </div>
        <p class="pop1">{{ user.username }}</p>
    </div>
    `,

    methods: {
        NavToHome() {
            
            console.log('this user has this access level:' + this.user.Permissions);
            let targetHome = '';

                
            // now if user has permission level 1, we can send them to the kids homepage
            // every user has permission as a part of their dataw which is coming from the database 
            // if it is greater than 3 then we can send them to adult home page
            if ( this.user.Permissions < 3 ) {
                targetHome = ' KidsHome';
            } else {
                targetHome = 'defaultHome';
            }
            
            this.$router.push({ name: targetHome });
        }

    }
}