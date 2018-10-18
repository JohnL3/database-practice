import os
from flaskext.mysql import MySQL
from pymysql.cursors import DictCursor

def DB_configuration(app):
    if app.config['DEBUG'] == True:
        import config
        
        app.config['MYSQL_DATABASE_HOST'] = config.DB_CONFIG['host']
        app.config['MYSQL_DATABASE_PORT'] = 3306
        app.config['MYSQL_DATABASE_USER'] = config.DB_CONFIG['user']
        app.config['MYSQL_DATABASE_PASSWORD'] = config.DB_CONFIG['password']
        app.config['MYSQL_DATABASE_DB'] = config.DB_CONFIG['db']
        
    else:
        app.config['MYSQL_DATABASE_HOST'] = os.getenv('DB_HOST')
        app.config['MYSQL_DATABASE_PORT'] = 3306
        app.config['MYSQL_DATABASE_USER'] = os.getenv('DB_USER')
        app.config['MYSQL_DATABASE_PASSWORD'] = os.getenv('DB_PASSWORD')
        app.config['MYSQL_DATABASE_DB'] = os.getenv('DB_DB')
        
    mysql = MySQL(cursorclass=DictCursor)
    mysql.init_app(app)
    return mysql
    
    
def validate_user(mysql, username, password):
    con = mysql.connect()
    curs = con.cursor()
    query = "SELECT user_name, password FROM user_table WHERE user_name ='" +username+ "'"

    curs.execute(query)
    result = curs.fetchall()
    
    if  len(result) != 0:
        if username == result[0]['user_name'] and password == result[0]['password']:
            return True
        else:
            return False
    else:
        return False
    
# query string for reuse
def get_sql_string():
    start_str = 'select details_table.recipe_id as id, recipe_name, category_name, author_name,hasMilk,hasNuts,hasMustard,hasCelery,hasCerals, '
    mid_str = 'hasCrustaceans,hasEgg,hasFish,hasLupin,hasMolluscs,hasPeanuts,hasSoyabeans,hasSesameseeds,hasSulpherdioxide from details_table '
    end_str ='join recipe_table on details_table.recipe_id = recipe_table.recipe_id join author_table on details_table.author_id = author_table.author_id '
    final_str = 'join category_table on details_table.cat_id = category_table.cat_id'
    
    full_str = start_str+mid_str+end_str+final_str
    return full_str
   
def get_all_recipes(mysql):
    con = mysql.connect()
    curs = con.cursor()
    
    sql = get_sql_string()
    sql = sql+' ORDER BY author_name;'
    curs.execute(sql)
    return curs.fetchall()
 
def get_all_authors(mysql):
    '''
    Get a list of authors names to be used in drop down filter
    '''
    con = mysql.connect()
    curs = con.cursor()
    sql = "SELECT author_name FROM author_table ORDER BY author_name"
    curs.execute(sql)
    return curs.fetchall()

def get_all_categorys(mysql):
    '''
    Get a list of category names to used in drop down filter
    '''
    con = mysql.connect()
    curs = con.cursor()
    sql = "SELECT category_name FROM category_table"
    curs.execute(sql)
    return curs.fetchall()
    
    
def insert_into_category(mysql,data):
    con = mysql.connect()
    curs = con.cursor()
    try:
        row = (data['category'])
        curs.execute('''INSERT INTO category_table(cat_id, category_name) VALUES(NULL,%s)''',row)
        con.commit()
        return 'all done'
    except Exception as e:
        return 'Error saving data: '+str(e)
        
def insert_into_recipe_table(mysql, data):
    
    nuts = data['allergens'][3]
    egg = data['allergens'][0]
    milk = data['allergens'][5]
    peanuts = data['allergens'][2]
    celery = data['allergens'][6]
    mustard = data['allergens'][7]
    sseed = data['allergens'][8]
    fish = data['allergens'][9]
    moll = data['allergens'][1]
    sb = data['allergens'][4]
    lupin = data['allergens'][10]
    sd = data['allergens'][11]
    cerals = data['allergens'][12]
    crust = data['allergens'][13]
    #Egg Molluscs Peanuts Nuts Soyabeans Milk Celery Mustard Sesame Seeds Fish Lupin Sulpher Dioxide Cereals Crustaceans
    # hasNuts | hasEgg | hasMilk | hasPeanuts | hasCelery | hasMustard | hasSesameseeds | hasFish | hasMolluscs | hasSoyabeans | hasLupin | hasSulpherdioxide | hasCerals | hasCrustacean
    con = mysql.connect()
    curs = con.cursor()
    try:
        row = (data['recipe_name'],nuts,egg,milk,peanuts,celery,mustard,sseed,fish,moll,sb,lupin,sd,cerals,crust)
        curs.execute('''INSERT INTO recipe_table(recipe_id, recipe_name, hasNuts, hasEgg, hasMilk, hasPeanuts, hasCelery, hasMustard, hasSesameseeds, hasFish, hasMolluscs, hasSoyabeans, hasLupin, hasSulpherdioxide, hasCerals, hasCrustaceans) VALUES(NULL,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)''',row)
        con.commit()
        return 'all done'
    except Exception as e:
        return 'Error saving data: '+str(e)
        
# Filter by a single/multiple allergen      
def filter_recipes_by(mysql, data):
    '''
    Get all recipies that dont contain the single allergen or multiple allergens supplied
    '''
    con = mysql.connect()
    curs = con.cursor()
    
    if len(data['allergens']) == 1:
        
        my_list = data['allergens'][0]
        
        my_str = get_sql_string()
        full_string = my_str +" WHERE "+ my_list + ' !="T" ORDER BY author_name asc'
       
        curs.execute(full_string)
        
        return curs.fetchall()
        #return full_string
    else:
        my_list = data['allergens']
        my_str = get_sql_string()
        #mid_str = " GROUP BY author_name asc"
        mid_str= get_end_str(my_list)
        end_str = " ORDER BY author_name ASC"
        full_string = my_str+mid_str+end_str
        curs.execute(full_string)
        
        return curs.fetchall()
        
    
# Filter by category or by author    
def filter_by_category(mysql, filter_type, val):
    con = mysql.connect()
    curs = con.cursor()
    
    start_str = get_sql_string()
    end_str = " where "+filter_type+" = '"+val+"' ORDER BY author_name ASC;"
    sql = start_str+end_str
    
    curs.execute(sql)
    return curs.fetchall()
    
def check_what_to_filter_by(data):
    if len(data) == 1:
        filter_by = list(data)
       
        return filter_by
    if len(data) == 2:
        filter_by = list(data)
        return filter_by
    else:
        filter_by = list(data)
        return filter_by
        

def filter_by_author_and_category(mysql, data):
    con = mysql.connect()
    curs = con.cursor()
    start_str = get_sql_string()
    
    end_str = " WHERE author_name ='" + data['author_name']+ "' AND category_name ='" + data['category_name']+ "' ORDER BY author_name ASC"
    sql = start_str+end_str
    
    curs.execute(sql)
    return curs.fetchall()
    
# used to add a && between allergen options eg hasNuts !='T' && hasEgg !='T'    
def get_end_str(allergens):
    count = len(allergens)
    b_str = " Having "
    if len(allergens) == 1:
        my_str = "Having " +allergens[0]+ " !='T'"
        return my_str
    else:
        for a in allergens:
            b_str+= a+" !='T'"
            if count > 1:
                b_str+= "&& "
                count-= 1
    return b_str
        
   

def filter_by_allergens_and_author_or_category(mysql, data, item):
    con = mysql.connect()
    curs = con.cursor()
    start_str = get_sql_string()
    mid_str = " WHERE "+ item +" ='"+data[item]+"' "
    end_str = get_end_str(data['allergens'])
    end_str += " ORDER BY author_name ASC"
    sql = start_str+mid_str+end_str
    
    curs.execute(sql)
    return curs.fetchall()
    

def filter_by_all(mysql,data):
    con = mysql.connect()
    curs = con.cursor()
    start_str = get_sql_string()
    mid_str = " WHERE author_name ='"+data['author_name']+"' AND category_name ='"+data['category_name']+"' "
    end_str = get_end_str(data['allergens'])
    end_str += " ORDER BY author_name asc"
    sql = start_str+mid_str+end_str
    
    curs.execute(sql)
    return curs.fetchall()
    
    

def filter_all_recipes(mysql,data):
    items = check_what_to_filter_by(data)
    if len(items) == 1:
        if 'author_name' in items or 'category_name' in items:
            result = filter_by_category(mysql, items[0], data[items[0]])
            return result
        else:
            result = filter_recipes_by(mysql,data)
            return result
    if len(items) == 2:
        if 'author_name' in items and 'category_name' in items:
            result = filter_by_author_and_category(mysql,data)
            return result
        elif 'author_name' in items and 'allergens' in items:
            result = filter_by_allergens_and_author_or_category(mysql,data, 'author_name')
            return result
        else:
            result = filter_by_allergens_and_author_or_category(mysql,data, 'category_name')
            return result
    else:
        result = filter_by_all(mysql, data)
        return result
        
def insert_into_ingredients(mysql, data):
    con = mysql.connect()
    curs = con.cursor()
    #data = [['Milk', '1ltr'], ['Sugar', '1/2 pound'], ['Flour', '500g']]
    try:
        row = data
        curs.executemany('''INSERT INTO ing_table(recipe_iss, ing_name, ing_quantity) VALUES(Null, %s, %s)''',row)
        con.commit()
        
        
    except Exception as e:
        return 'Error saving data: '+str(e)
    
    curs.execute('''SELECT LAST_INSERT_ID()''')
    last_id = curs.fetchall()
    
    return last_id
    
def test_val(mysql, data):
    con = mysql.connect()
    curs = con.cursor()
    username = data['username']
    
    query = "SELECT user_id FROM user_table WHERE user_name ='" +username+ "'"
    curs.execute(query)
    user_id = curs.fetchall()
    user_id = user_id[0]['user_id']
    return user_id
        
        
        
    
    
       