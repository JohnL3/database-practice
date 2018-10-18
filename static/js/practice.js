$('#burger').click(function(){

   if($('aside').css('left') === '-495px') {
        $('aside').animate({left: '0'});
        $('.card').animate({'margin-left': '545px'});
   } else {
       $('aside').animate({left: '-495px'});
       $('.card').animate({'margin-left': '50px'});
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
       let url = 'https://database-practice-johnl3.c9users.io/practice';
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