window.LoginView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing Login View');
    },

    events: {
        "click #loginButton": "login"
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },

    login:function (event) {
        event.preventDefault(); // Don't let this button submit the form
        $('.alert-error').hide(); // Hide any errors on a new submit
        var url = '../api/login';
        console.log('Loggin in... ');
        var formValues = {
            username: $('#inputUserName').val(),
            password: $('#inputPassword').val()
        };

        $.ajax({
            url:url,
            type:'POST',
            dataType:"text",
            data: formValues,
            success:function (data) {
                console.log(["Login request details: ", data]);
                if (data.redirect) {
                    // data.redirect contains the string URL to redirect to
                    window.location.href = data.redirect;
                }
                else if(data.error) {  // If there is an error, show the error
									// messages
                    $('.alert-error').text(data.error.text).show();
                }
//                else { // If not, send them back to the home page
//                    window.location.replace('#');
//                }
            },
            statusCode: {
            	302: function(jqXHR,textStatus,errorThrown) {
            		location.href = "/";
            	}
            }
        });
    }
});
