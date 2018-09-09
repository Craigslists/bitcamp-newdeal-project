'use strict'


$('#addBtn').click(() => {
	console.log("okok")
    var check = false;
    let input = $('.validate-input .input100');
    (function () {
        check = true;
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) === false){
                showValidate(input[i]);
                check=false;
            }
        }
        return check;
    })();


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') === 'fEmail' || $(input).attr('fName') === 'fEmail') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() === ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }
    if(!chkid){
        swal({
            html: true,
            title: "아이디 중복체크를 <br/> 확인해주십시오",
            type: "warning",
            confirmButtonClass: "btn-danger",
          });
      signup.fEmail.focus();
      return false;
    }
//    (function () {
//        if($('#fEmail').value==null){
//            alert("이메일이 입력되지 않았습니다.");
//            signup.fEmail.value ="";
//            signup.fEmail.focus();
//            return false;
//        }
//        if(!chkid){
//            alert("이메일 중복체크를 실행해주세요.");
//            signup.fEmail.focus();
//            return false;
//        }
//       
//        if(Password.value  ==0){
//            alert("비밀번호를 입력해주세요.");
//            signup.fPassword.focus();
//            return false;
//        }
// 
//        if(!chkpass){
//            alert("비밀번호가 일치하지 않습니다. 다시 입력해 주세요");
//            return false;
//        }
//    })
	
	
	
if (check) {
    $.post(`${serverApiAddr}/json/member/signUp`, {
        'email': $('#fEmail').val(),
        'name': $('#fName').val(),
        'password': $('#fPassword').val()
	    }, (result) => {
	    	
	    	if(result.status ==='success'){
	    		console.log("성공")
	    		   swal("회원가입이 완료 되었습니다.", "이메일 인증후 로그인해주세요.");
				  setTimeout(function () {
					  location.href=`${serverApiAddr}/index.html`;
				  }, 1000);
	    		
	    	}else{
	    		alert('실패');
	    		console.log(result.message)
	    		console.log(result);
	    	}
	        console.log(result);
	    }, 'json')
	    .fail(() => { 
	    	swal("오류!!!!", "회원 가입 중에 오류 발생!.", "success");
	        //alert('회원 가입 중에 오류 발생!')
	    });
}
});

