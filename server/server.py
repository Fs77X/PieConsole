from flask import Flask, jsonify, request
app = Flask(__name__)




@app.route('/getSettings')
def getSettings():
   return jsonify({
      'r':r,
      'g':g,
      'b':b,
      'temp':temp,
      'pattern':pattern
   }), 200

@app.route('/setSettings')
def setSettings():
   global r
   global g 
   global b
   global temp 
   global pattern
   req = request.get_json()
   r = req['r']
   g = req['g']
   b = req['b']
   temp = req['temp']
   pattern = req['pattern']
   # add embedded code to update pieconsole settings here!
   return jsonify({
      'message':'settings updated'
   })


@app.route('/')
def hello_world():
   return 'Hello World'

if __name__ == '__main__':
   global r
   r = 255
   global b
   b = 255
   global g 
   g = 255
   global a 
   a = 1
   global pattern
   pattern = 0
   global temp
   temp = 0
   app.run()