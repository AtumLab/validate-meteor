var Model = validation.get('Model');

Tinytest.add('Model - Model', function(testTiny){
    try {
        // Style 0
        var BlogPost = new Model({
            title     : 'String',
            body      : 'String',
            date      : 'Date'
        });
        console.log( BlogPost, 'BlogPost' );
        BlogPost.set({
            title : 'hello',
            body : 'world'
        });
        testTiny.equal(BlogPost.get('title'), 'hello', "expected 'hello'");
        testTiny.equal(BlogPost.get('body'), 'world', "expected 'world'");
        /**
        // Style 1
        var accountModel = new Model();
        var username = accountModel.addElement('username', {
            _init: function(){
                this.setRequired(true).addValidator(['String', 6, 10])
                .setMessage('Invalid {{name}} : {{value}}');
            }
        });
        var password = accountModel.addElement('password', {
            _init: function(){
                this.setRequired(true).addValidator('Number')
                .setMessage('Invalid {{name}} : {{value}}');
            }
        });
        accountModel.test({
            username: 'hoang le',
            password: 123456
        });

        // Style2
        var formModel = new Model({
            elements: {
                user_full_name: "required",
                user_name: {
                    required: true,
                    minlength: 6
                },
                password: {
                    required: true,
                    minlength: 6
                },
                confirm_password: {
                    required: true,
                    minlength: 6,
                    equalTo: "#password"
                },
                email: {
                    required: true,
                    email: true
                },
            },
            messages: {
                user_full_name: "Tên đầy đủ không được để trống",
                user_name: {
                    required: "Tên đăng nhập không được để trống",
                    minlength: "Tên đăng nhập có độ dài tối thiểu 6 ký tự"
                },
                password: {
                    required: "Xin mời nhập mật khẩu",
                    minlength: "Mật khẩu phải có đổi dài tối thiểu 6 ký tự"
                },
                confirm_password: {
                    required: "Xin mời nhập lại mật khẩu",
                    minlength: "Mật khẩu phải có đổi dài tối thiểu 6 ký tự",
                    equalTo: "Không trùng mật khẩu, xin mời nhập lại"
                },
                email: {
                    email: "Địa chỉ email không hợp lệ.",
                    required: "Địa chỉ email không được bỏ trống"
                }
            }
        });
        formModel.test({

        });
        */
    }
    catch (e) {
        throw e;
    }
});