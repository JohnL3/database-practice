$('.filter-tab').click(function(){
  $(this).css('z-index',26);
  $('.main-filter-page').css('z-index',17);
  $('.login-signup-tab').css('z-index',5)
  $('.main-signup-page').css('z-index',5);
});

$('.login-signup-tab').click(function(){
  $(this).css('z-index',26);
  $('.main-signup-page').css('z-index',17);
  $('.filter-tab').css('z-index',5)
  $('.main-filter-page').css('z-index',5);

});

$('#burger').click(function(){

   if($('aside').css('left') === '-260px') {
        $('aside').animate({left: '0'});
        $('.card').animate({'margin-left': '305px'});
        $('header').animate({'margin-left': '305px'});
   } else {
       $('aside').animate({left: '-260px'});
       $('.card').animate({'margin-left': '45px'});
       $('header').animate({'margin-left': '45px'});
       
   }
});

$('.sup-log').click(function(){
    let item = $(this).attr('id');
    if(item === 'l-i') {
        $('#user button').text('Login');
        $('form').attr('action', 'https://database-cook-johnl3.c9users.io/login');
    } else {
        $('#user button').text('Sign Up');
        $('form').attr('action', 'https://database-cook-johnl3.c9users.io/signup')
    }
});

$('#filter-A').click(function(){
    if($('.filter-select-A').css('display') === 'none') {
        $('.filter-select-A').css('display', 'block');
       // if($(window).width() < 500) {
            $('.filter-select-B').css('display', 'none');
            $('.filter-select-C').css('display', 'none');
        //}
    } else {
        $('.filter-select-A').css('display', 'none');
    }
});

$('#filter-B').click(function(){
    if($('.filter-select-B').css('display') === 'none') {
        $('.filter-select-B').css('display', 'block');
       // if($(window).width() < 500) {
            $('.filter-select-A').css('display', 'none');
            $('.filter-select-C').css('display', 'none');
       // }
    } else {
        $('.filter-select-B').css('display', 'none');
    }
});

$('#filter-C').click(function(){
    if($('.filter-select-C').css('display') === 'none') {
        $('.filter-select-C').css('display', 'block');
        //if($(window).width() < 500) {
            $('.filter-select-A').css('display', 'none');
            $('.filter-select-B').css('display', 'none');
       // }
    } else {
        $('.filter-select-C').css('display', 'none');
    }
});

let oneChecked = false;
// submit values to filter database by
$('.sub-btn').click(function(){
    let allergens = [];
    let data = {};
    
    let ckboxIsCk = $('input[name="allergen"]:checked').length > 0;
    let rdIsCkA = $('input[name="author"]:checked').length > 0;
    let rdIsCkC = $('input[name="category"]:checked').length > 0;
     $('.filter-select-A').css('display', 'none');
     $('.filter-select-B').css('display', 'none');
     $('.filter-select-C').css('display', 'none');
            
    if(ckboxIsCk === true || rdIsCkA === true || rdIsCkC === true) {
       
       $('.clear-btn').css('background','buttonface');
       
       if (ckboxIsCk === true) {
           $('input[type=checkbox]').each(function () {
                  if ($(this).is(":checked")){
                    allergens.push($(this).attr('class'));
                  } 
            });
           data.allergens = allergens;
       }
       
       if(rdIsCkC === true) {
          let cat = $('input[name="category"]:checked').val();
          data.category_name = cat;
       }
       
       if(rdIsCkA === true) {
          let aut = $('input[name="author"]:checked').val();
          data.author_name = aut;
         
       }
       $('input:checkbox').prop('checked',false);
       $('input:radio').prop('checked',false);
       $('.sub-btn').prop('disabled', true)
       
       console.log(data);
       let url = 'http://database-cook-johnl3.c9users.io/';
        $.ajax({
            type : 'POST',
            url : url,
            contentType: 'application/json;charset=UTF-8',
            dataType: 'json',
            data : JSON.stringify(data),
            success: function(d){
               console.log(d);
               let data = d.data;
               
               createRecipesDivs(data);
            }
        });
    }
});

$('.clear-btn').click(function(){
    
     $('input:checkbox').prop('checked',false);
     $('input:radio').prop('checked',false);
     $(this).css('background','buttonface');
     $('.sub-btn').prop("disabled", true);
     oneChecked = false;
});

$('input:radio').click(function(){
    if($(this).prop('checked',true)){
        $('.clear-btn').css('background','lightblue');
        $('.sub-btn').prop("disabled", false);
        oneChecked = true;
    }
});

$('input:checkbox').click(function(){
    
    let ckboxIsCk = $('input[name="allergen"]:checked').length > 0
    if(ckboxIsCk === true){
        $('.clear-btn').css('background','lightblue');
        $('.sub-btn').prop("disabled", false);
    } else {
       if(oneChecked === false) {
           $('.clear-btn').css('background','buttonface');
           $('.sub-btn').prop("disabled", true);
       }
    }
});

function createRecipesDivs(data) {
    $('.card').html('');
    let allergen_spans = '';
    
    for (let x=0; x<data.length;x++){
        
            if(data[x].hasEgg === 'T'){
                allergen_spans += '<span class="allergen">Egg</span>';
            }
            if(data[x].hasNuts === 'T'){
                allergen_spans += '<span class="allergen">Nut</span>';
                 
            }
            if(data[x].hasMolluscs === 'T'){
                allergen_spans += '<span class="allergen">Molluscs</span>';
            }
            if(data[x].hasPeanuts === 'T'){
                allergen_spans += '<span class="allergen">Peanuts</span>';
            }
            if(data[x].hasSoyabeans === 'T'){
                allergen_spans += '<span class="allergen">Soyabeans</span>';
            }
            if(data[x].hasMilk === 'T'){
                allergen_spans += '<span class="allergen">Milk</span>';
            }
            if(data[x].hasCelery === 'T'){
                allergen_spans += '<span class="allergen">Celery</span>';
            }
            if(data[x].hasMustard === 'T'){
                allergen_spans += '<span class="allergen">Mustard</span>';
            }
            if(data[x].hasSesameseeds === 'T'){
                allergen_spans += '<span class="allergen">Sesame Seeds</span>';
            }
            if(data[x].hasFish === 'T'){
                allergen_spans += '<span class="allergen">Fish</span>';
            }
            if(data[x].hasLupin === 'T'){
                allergen_spans += '<span class="allergen">Lupin</span>';
            }
            if(data[x].hasSulpherdioxide === 'T'){
                allergen_spans += '<span class="allergen">Sulpher Dioxide</span>';
            }
            if(data[x].hasCerals === 'T'){
                allergen_spans += '<span class="allergen">Cereals</span>';
            }
            if(data[x].hasCrustacean === 'T'){
                allergen_spans += '<span class="allergen">Crustaceans</span>';
            }
            
            let innerDiv= `<div class="recipe-allergens">
            `+allergen_spans+`
            </div>`;
            
            let outerDiv = `<div id='`+data[x].id+`'>
                                <h2>`+data[x].recipe_name+`</h2>
                                <div class='author-category'>
                                    <span class='menu-titles'> Category </span> <span class='menu-titles'>Author</span>
                                    <span>`+data[x].category_name+`</span> <span>`+data[x].author_name+`</span>
                                </div>
                                <span class='all-allergen'>ALLERGENS</span>
                                `+innerDiv+`
                            </div>`;
            
            $('.card').append(outerDiv);
            
            allergen_spans = '';
        
    }
}

/*
$('.allergen-filter').click(function(){
    let filter_by = [];
    let data = {};
    $('input[type=checkbox]').each(function () {
          if ($(this).is(":checked")){
            filter_by.push($(this).attr('class'));
          } 
    });
    data.filter = filter_by;  
    console.log(data);
    let url = 'https://database-practice-johnl3.c9users.io/';
    $.ajax({
        type : 'POST',
        url : url,
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        data : JSON.stringify(data),
        success: function(d){
           console.log(d.data);
           let data = d.data;
           console.log('length',typeof(data));
           createRecipesDivs(data);
        }
    });
});

function createRecipesDivs(data) {
    $('.card').html('');
    let allergen_spans = '';
    
    for (let x=0; x<data.length;x++){
        
            if(data[x].hasEgg === 'T'){
                allergen_spans += '<span class="allergen">Egg</span>';
            }
            if(data[x].hasNuts === 'T'){
                allergen_spans += '<span class="allergen">Nut</span>';
                 
            }
            if(data[x].hasMolluscs === 'T'){
                allergen_spans += '<span class="allergen">Molluscs</span>';
            }
            if(data[x].hasPeanuts === 'T'){
                allergen_spans += '<span class="allergen">Peanuts</span>';
            }
            if(data[x].hasSoyabeans === 'T'){
                allergen_spans += '<span class="allergen">Soyabeans</span>';
            }
            if(data[x].hasMilk === 'T'){
                allergen_spans += '<span class="allergen">Milk</span>';
            }
            if(data[x].hasCelery === 'T'){
                allergen_spans += '<span class="allergen">Celery</span>';
            }
            if(data[x].hasMustard === 'T'){
                allergen_spans += '<span class="allergen">Mustard</span>';
            }
            if(data[x].hasSesameseeds === 'T'){
                allergen_spans += '<span class="allergen">Sesame Seeds</span>';
            }
            if(data[x].hasFish === 'T'){
                allergen_spans += '<span class="allergen">Fish</span>';
            }
            if(data[x].hasLupin === 'T'){
                allergen_spans += '<span class="allergen">Lupin</span>';
            }
            if(data[x].hasSulpherdioxide === 'T'){
                allergen_spans += '<span class="allergen">Sulpher Dioxide</span>';
            }
            if(data[x].hasCerals === 'T'){
                allergen_spans += '<span class="allergen">Cereals</span>';
            }
            if(data[x].hasCrustacean === 'T'){
                allergen_spans += '<span class="allergen">Crustaceans</span>';
            }
            
            let innerDiv= `<div class="allergens">
            `+allergen_spans+`
            </div>`;
            
            let outerDiv = `<div id='`+data[x].recipe_id+`'>
                                <h2>`+data[x].recipe_name+`</h2>
                                <div class='author-category'>
                                    <span class='menu-titles'> Category </span> <span class='menu-titles'>Author</span>
                                    <span>`+data[x].category_name+`</span> <span>`+data[x].author_name+`</span>
                                </div>
                                <span class='all-allergen'>ALLERGENS</span>
                                `+innerDiv+`
                            </div>`;
            
            $('.card').append(outerDiv);
            
            allergen_spans = '';
        
    }
}


// filter by author or category
$('.by-cat-btn').click(function(){
    
    let data = {};
    let auth =  $('.author-fil').val();
    let cat =  $('.category-fil').val();
    
    let aller = $('.allergen-fil').val()
    console.log('HERRE',aller);
    if(auth != ''){
        data.author_name = auth;
    } else if(cat != '') {
        data.category_name = cat;
    } else {
        let choices=['hasmilk','hasnuts','hascrustacean','hascerals','hassulpherdioxide','haslupin','hasfish','hassesameseeds','hasmustard','hasmolluscs','hascelery','hassoyabeans','haspeanuts','hasegg'];
        let combined ='has'+(aller);
        console.log('combined',combined);
        if(choices.includes(combined.toLocaleLowerCase()) ) {
            data.allergen_name = combined;
        }
    }
    
     
    console.log(data);
    let url = 'https://database-practice-johnl3.c9users.io/';
    $.ajax({
        type : 'POST',
        url : url,
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        data : JSON.stringify(data),
        success: function(d){
           console.log(d.data);
           let data = d.data;
           console.log('length',typeof(data));
           createRecipesDivs(data);
        }
    });
    
});


$('input[type=radio]').click(function(){
    
    if ($(this).attr('id') === 'author') {
        $(".category-fil").prop('disabled', true);
        $('.author-fil').prop('disabled', false);
        $('.allergen-fil').prop('disabled', true);
        $('.category-fil').val('');
        $('.allergen-fil').val('');
         $('.author-fil').focus();
    } else if($(this).attr('id') === 'category' ) {
        $(".category-fil").prop('disabled', false);
        $('.author-fil').prop('disabled', true);
        $('.allergen-fil').prop('disabled', true);
        $('.author-fil').val('');
        $(".category-fil").focus();
        $('.allergen-fil').val('');
    } else {
        $(".category-fil").prop('disabled', true);
        $('.author-fil').prop('disabled', true);
        $('.allergen-fil').prop('disabled', false);
        $('.author-fil').val('');
        $(".allergen-fil").focus();
        $('.category-fil').val('');
    }
});
*/