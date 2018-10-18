$('.more-ing').click(function(){
  addOptions();
})
function addOptions() {
		var option = '<div class="ing-del"><input type="text" class="a1" placeholder="Sugar"><input type="text" class="a2" placeholder="1/2 lb"><span class="delete">X</span></div>';
   $(option).insertBefore('.list-more-ing');
}

$(function(){
    $('.receipe-ing').on('click', 'span', function(){
       var rem = $(this).closest('div.ing-del');
    $(rem).remove();
       });
});


function pair_ing_quan(ing_quan){
  let ing_and_quan = [];
  let inner = [];
  let count = 0;
  let r_len =  $('.receipe-ing :input[type=text]').length;
  let b_count = 0;
  let all_ok = true;
  
  ing_quan.each(function(){
    if(all_ok === true) {
    if($(this).val() != ''){ 
      count++;
      b_count++;
      if(count === 3 ) {
        ing_and_quan.push([...inner]);
        inner=[];
        count=1;
      }
      inner.push($(this).val());
   } else{
     count++;
     b_count++;
     //inner.push(0);
     all_ok = false;
     $(this).addClass('error');
   }
      if (b_count === r_len) {
        if(inner.length != 0) ing_and_quan.push(inner);}
    }
    
  });
  if(all_ok === true) {
    return ing_and_quan;
  } else {
    return [];
  }
  
 
}

function check_validation(r_q, ins) {
  
  let author =  $('.author-inp').val();
  let recipeName = $('.recipe-inp').val();
  let category =  $( ".category-option option:selected" ).text();
  
  if(author === '' || recipeName === '' || category === '' || r_q.length < 1) {
    if(author === '') $('.author-inp').addClass('error');
    if(recipeName === '') $('.recipe-inp').addClass('error');
    setTimeout(function(){
       $('.author-inp').removeClass('error');
       $('.recipe-inp').removeClass('error');
       $('input[type="text"]').removeClass('error');
    },2500);
    return false;
  } else {
    return true;
  }
  
}

$('.submit-btn').click(function(){
  // Get the ingredients and quantity add them to an array
  let ing_and_quan = pair_ing_quan( $('.receipe-ing :input[type=text]'));
  
  // add instructions to an array
  let instructions = [];
  $('#ol-ing li').each(function() {
    if ($(this).text() != '') {
    instructions.push($(this).text());
    }
  });
  
  let validated = check_validation(ing_and_quan, instructions);
  if (validated === true) {
  

// add allergens to an array
  let allergens=[];
  $('input[type=checkbox]').each(function () {
      if ($(this).is(":checked")){
        allergens.push('T');
      } else {
        allergens.push('F');
      }
  });
// create data being pushed to server
  let data = {};
  data.author_name = $('.author-inp').val();
  data.recipe_name = $('.recipe-inp').val();
  data.category = $( ".category-option option:selected" ).text();
  data.allergens = allergens;
  data.instructions = instructions;
  data.ing_and_quan = ing_and_quan;


  console.log(data);
  let url = 'https://database-practice-johnl3.c9users.io/createnewrecipe';
  $.ajax({
        type : 'POST',
        url : url,
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        data : JSON.stringify(data),
        success: function(d){
           console.log(d);
        }
      });
    }
})