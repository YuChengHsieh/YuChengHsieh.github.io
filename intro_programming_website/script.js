const header_pic_frame = document.getElementById('header_pic_frame')
const intro_pic_frame = document.getElementById('intro_pic_frame')
const footer_pic_frame = document.getElementById('footer_pic_frame')
const footer_pic_sit_frame = document.getElementById('footer_pic_sit_frame')
const background_pic_frame = document.getElementById('background_pic_frame')
const submit_btn = document.getElementById('submit_btn')
const suggestion_column = document.getElementById('suggestion_column')
const arrow_left = document.getElementById('arrow_left')
const arrow_right = document.getElementById('arrow_right')
const background_pic = document.getElementById('background_pic')
const background_intro = document.getElementById('background_intro')

//--讓icon動起來
let pic_count = 1

function change_pic_animation(){
    let htmlStr=''

    htmlStr = htmlStr +  `
        <img src="picture/main_char_icon_${pic_count}.png"/>
    `
    if(pic_count === 1) pic_count++
    else pic_count=1

    intro_pic_frame.innerHTML = htmlStr
    footer_pic_frame.innerHTML = htmlStr
}

let pic_header_count = 1

function change_pic_animation_header(){
    if(pic_header_count == 1){
        $('#header_icon_1').hide()
        $('#header_icon_2').show()
        pic_header_count = 0
    }
    else{
        $('#header_icon_1').show()
        $('#header_icon_2').hide()
        pic_header_count = 1
    }
}


$(document).ready(function(){
    $('#header_icon_2').hide()
    setInterval(change_pic_animation_header,800)
})

let pic_sit_count = 1

function change_pic_sit_animation(){
    let htmlStr=''

    htmlStr = htmlStr +  `
        <img src="picture/main_char_sit${pic_sit_count}.png"/>
    `
    if(pic_sit_count === 1) pic_sit_count++
    else pic_sit_count=1

    footer_pic_sit_frame.innerHTML = htmlStr
}

setInterval(change_pic_animation,800)
setInterval(change_pic_sit_animation,800)

//--use JQuery to change background
const total_background = 4
background_list=[]
name_list = ['Lobby','Bathroom','Kitchen','Ｍysterious Space']
desc_list = ['','','','']

function construct_background(name,img,desc){
    return{
        name:name,
        img:img,
        desc:desc,
    }
}

for(let i=0 ; i<total_background ; i++){
    background_list.push(construct_background(name_list[i],`picture/background${i+1}.png`,desc_list))
}

console.log(background_list)

let background_id = 0

function change_background_animation_left(){
    if(background_id === 0) background_id=3;
    else background_id--;
    $('#background_pic_frame').fadeOut('slow',function(){
        $('#background_pic').attr("src",background_list[background_id].img);
        $('#background_name').html(`<h4>${background_list[background_id].name}</h4>`);
        $('#background_pic_frame').fadeIn('slow');
    })  
}

function change_background_animation_right(){
    if(background_id === 3) background_id=0;
    else background_id++;
    $('#background_pic_frame').fadeOut('slow',function(){
        $('#background_pic').attr("src",background_list[background_id].img);
        $('#background_name').html(`<h4>${background_list[background_id].name}</h4>`);
        $('#background_pic_frame').fadeIn('slow');
    })
}

$(document).ready(function(){
    $('#arrow_left').click(function(){
        change_background_animation_left();
    })

    $('#arrow_right').click(function(){
        change_background_animation_right();
    })
})

//--決定意見回饋的彈出視窗
$(document).ready(function(){
    $('#submit_btn').click(function(){
        console.log('col',$('#suggestion_column').val())
        if($('#suggestion_column').val()===""){
            $('#reply_text').html(`<p>You haven't entered any comments yet!</p>`);
            
        }
        else{
            $('#reply_text').html(`<p>We have received your message. Thank you for your response!</p>`);
            $('#suggestion_column').val('');
        }
    })
})

const user_dict=[]

class User{
    constructor(name,account,passward){
        this.name = name;
        this.account = account;
        this.passward = passward;
    }
    get_name(){
        return this.name;
    }
    get_account(){
        return this.account;
    }
    get_passward(){
        return this.passward;
    }
}

function register_clear(){
    $('#r_name').val('');
    $('#r_account').val('');
    $('#r_password').val('');
    $('#r_password_check').val('');
}

function login_clear(){
    $('#l_account').val('');
    $('#l_password').val('');
}

//--註冊時取得帳號與密碼存起來
$(document).ready(function(){
    $('#registration_btn').click(function(){
        //--帳號第一位須為英文
        if($('#r_name').val() == "" || $('#r_account').val() == "" || $('#r_password').val() == "" || $('#r_password_check').val() == ""){
            alert("Please make sure to provide your username, account, and password accurately.");
            register_clear();
        }
        else if(($('#r_account').val()[0] <'a' || $('#r_account').val()[0] >'z') &&
            ($('#r_account').val()[0] <'A' || $('#r_account').val()[0] >'Z')
        ){
            alert("The first digit of the account must be in English.");
            register_clear();
        }
        else if($('#r_password').val() !== $('#r_password_check').val()){
            alert("The two entered passwords do not match.");
            register_clear();
        }
        else{
            //--一開始設true
            let available = true;
            user_dict.forEach( (items,index)  =>{
                if($('#r_account').val() === items.account){
                    alert("This account has already been registered.");
                    register_clear();
                    available = false;
                    return;
                }
                if($('#r_name').val() === items.name){
                    alert("This nickname has already been used.");
                    register_clear();
                    available = false;
                    return ;
                }
                if(index === user_dict.length-1){
                    return ;
                }
            })
            
            console.log('available',available);

            if(available){
                user_dict.push(new User($('#r_name').val(),$('#r_account').val(),$('#r_password').val()));
                alert("Registration Success");
                register_clear();
                console.log(user_dict);
                console.log('account value',$('#r_account').val());
            }
        }
    })
})


//--登入時需要驗證
$(document).ready(function(){
    $('#login_btn').click(function(){
        user_dict.forEach(function( items,index ){
            if($('#l_account').val() === items.account){
                console.log('in');
                $('#login_name_toggle').html(`
                                              <p class="nav-link nav-link-right" id="login_status">${items.name}</p>`)
                $('#login_text').html(`<a class="nav-link nav-link-right" href="#logOut_page" data-toggle="modal" data-target="#logOut_page">Logout</a>`)
                alert('Login Success');
                login_clear();
                return;
            }
            if(index === user_dict.length-1){
                console.log('not in');
                alert('Login Fail');
                login_clear();
            }
            
        })
    })
})

//--登出時切換
$(document).ready(function(){
    $('#logOut_btn').click(function(){
        $('#login_name_toggle').html(`<p class="nav-link nav-link-right" id="login_status">Guest</p>`);
        $('#login_text').html(`<a class="nav-link nav-link-right" href="#login_page" data-toggle="modal" data-target="#login_page">Login</a>`);
    })
})

//--當向下捲動時 浮動固定上選單變小
$(document).ready(function(){
    $(window).scroll(function(){
        if($(window).scrollTop() !== 0){
            $('#header_icon_1').css('width','25px')
            $('#header_icon_2').css('width','25px')
            //console.log('a')
        }
        else{
            $('#header_icon_1').css('width','40px')
            $('#header_icon_2').css('width','40px')
        }
    })
})