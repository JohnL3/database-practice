all_allergens = ['hasEgg', 'hasNuts']
all_authors = []#['John Long']

def create_string(l_all, a_all):
    count = len(l_all)
    countB = len(a_all)
    if len(l_all) == 1 and len(a_all) == 0:
        return 'SELECT * FROM details_table JOIN recipe_table.recipe_id On recipe_table.recipe.id = details_table.recipe_id WHERE ' +l_all[0]+ ' !="T"'
    if len(l_all) == 1 and len(a_all) == 1:
        return 'SELECT * FROM details_table JOIN recipe.recipe_id ON recipe.recipe_id = details.recipe_id  JOIN author.author_id ON author.author_id = detail.author_id WHERE author_name' + ' == ' + a_all[0] + ' GROUP BY author_name HAVING ' + l_all[0]+ ' !="T"'
    else:
        full_s = 'SELECT * FROM details_table JOIN recipe_table.recipe_id ON recipe_table.recipe_id = details_table.recipe_id WHERE '
        
        for s in l_all:
            full_s+=  s+' !="T" '
            if count > 1:
                full_s += '&& ' 
                count-= 1
            
        return full_s
        
result = create_string(all_allergens, all_authors)
print(result)



def get_all_of_recipes():
    start_str = 'select recipe_name, category_name, author_name,hasMilk,hasNuts,hasMustard,hasCelery,hasCerals, '
    mid_str = 'hasCrustaceans,hasEgg,hasFish,hasLupin,hasMolluscs,hasPeanuts,hasSoyabeans,hasSesameseeds,hasSulpherdioxide from details_table '
    end_str ='join recipe_table on details_table.recipe_id = recipe_table.recipe_id join author_table on details_table.author_id = author_table.author_id '
    final_str = 'join category_table on details_table.cat_id = category_table.cat_id;'
    
    full_str = start_str+mid_str+end_str+final_str
            