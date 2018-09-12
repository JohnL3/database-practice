import os
from os import environ
from flask import Flask, redirect, url_for, render_template
from flaskext.mysql import MySQL



app = Flask(__name__)

'''
app.config['MYSQL_DATABASE_HOST'] = config.DB_CONFIG['host']
app.config['MYSQL_DATABASE_PORT'] = 3306
app.config['MYSQL_DATABASE_USER'] = config.DB_CONFIG['user']
app.config['MYSQL_DATABASE_PASSWORD'] = config.DB_CONFIG['password']
app.config['MYSQL_DATABASE_DB'] = config.DB_CONFIG['db']
'''
app.config['MYSQL_DATABASE_HOST'] = os.getenv('DB_HOST')
app.config['MYSQL_DATABASE_PORT'] = 3306
app.config['MYSQL_DATABASE_USER'] = os.getenv('DB_USER')
app.config['MYSQL_DATABASE_PASSWORD'] = os.getenv('DB_PASSWORD')
app.config['MYSQL_DATABASE_DB'] = os.getenv('DB_DB')


mysql = MySQL()
mysql.init_app(app)

@app.route('/')
def index():
   con = mysql.connect()
   #cursor = mysql.connect().cursor()
   curs = con.cursor()
   #cur = mysql.get_db().cursor()
   curs.execute('''SELECT * FROM username''')
   rv = curs.fetchall()
   
   return str(rv)
   
@app.route('/addone/<string:insert>')
def addone(insert):
    con = mysql.connect()
    curs = con.cursor()
    try:
        curs.execute('''INSERT INTO username(username) VALUES(%s)''',insert)
        con.commit()
        return 'all done'
    except Exception as e:
        return 'Error saving data: '+str(e)
    
@app.route('/getall')
def getall():
    return 'all done'


if __name__ == '__main__':
    app.run(host=os.getenv('IP'), port=int(os.getenv('PORT')))


