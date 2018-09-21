import os
from os import environ
from flask import Flask, redirect, url_for, render_template, jsonify
from flaskext.mysql import MySQL
from pymysql.cursors import DictCursor
mysql = MySQL(cursorclass=DictCursor)



app = Flask(__name__)
app.config['DEBUG'] = False

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

@app.route('/')
def index():
   con = mysql.connect()
   curs = con.cursor()
   sql = "SELECT * FROM user_table"
   curs.execute(sql)
   rv = curs.fetchall()
  
   return jsonify(rv)
   
@app.route('/addone/<string:insert>')
def addone(insert):
    con = mysql.connect()
    curs = con.cursor()
    try:
        curs.execute('''INSERT INTO user_table(user_name) VALUES(%s)''',insert)
        con.commit()
        return 'all done'
    except Exception as e:
        return 'Error saving data: '+str(e)
    
@app.route('/getall')
def getall():
    return 'all done'


if __name__ == '__main__':
    app.run(host=os.getenv('IP'), port=int(os.getenv('PORT')))


