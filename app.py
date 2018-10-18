import os
from os import environ
from flask import Flask, redirect, url_for, render_template, jsonify
from database.DB_functions import DB_configuration, get_all_recipes, insert_into_ingredients, test_val



app = Flask(__name__)
app.config['DEBUG'] = True

mysql = DB_configuration(app)

@app.route('/')
def index():
   data = get_all_recipes(mysql)
   return render_template('index.html', recipe=data)

@app.route('/test')
def test():
    data = {}
    data['username'] = 'John_L3'
    result = test_val(mysql, data)
    
    return str(result)
   
@app.route('/addone/<string:insert>/<string:password>')
def addone(insert, password):
    con = mysql.connect()
    curs = con.cursor()
    try:
        row = ['Mad_Hat', password]
        curs.execute('''INSERT INTO user_table(user_id, user_name, password) VALUES(Null , %s, %s)''',row)
        con.commit()
        curs.execute('''SELECT LAST_INSERT_ID()''')
        last_id = curs.fetchall()
        r = last_id[0]['LAST_INSERT_ID()']
    except Exception as e:
        return 'Error saving data: '+str(e)
        
    try:
        row = [insert, password]
        curs.execute('''INSERT INTO user_table(user_id, user_name, password) VALUES(Null , %s, %s)''',row)
        con.commit()
        curs.execute('''SELECT LAST_INSERT_ID()''')
        last_id = curs.fetchall()
        s = last_id[0]['LAST_INSERT_ID()']
        return str(r)+' '+ str(s)
    except Exception as e:
        return 'Error saving data: '+str(e)
        
    
    
@app.route('/inserting')
def inserting():
    data = [['Milk', '1ltr'], ['Sugar', '1/2 pound'], ['Flour', '500g']]
    res = insert_into_ingredients(mysql, data)
    #return jsonify({'data':res})
    r = res[0]['LAST_INSERT_ID()']
    return str(r)


if __name__ == '__main__':
    app.run(host=os.getenv('IP'), port=int(os.getenv('PORT')))


