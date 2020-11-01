from flask import Flask, jsonify, request
from flask_cors import CORS
from collections import defaultdict
from datetime import date, datetime

# declaring app. static folder tells where the index html will be
app = Flask(__name__, static_folder='build', static_url_path='/')

# Cross-Origin Resource Policy
CORS(app)

# func for changing ExcelDate format to date format
# so as to compare with the today date
def chng(x):
    return (date.fromordinal(date(1900, 1, 1).toordinal() + x - 2))

# Post API 
@app.route('/upload', methods=['POST'])
def upload():

# initializing rows and cols
    rows = request.get_json()['rows']
    cols = rows[0]

# various info asked in the problem statement
    numInvoices = 0
    totSum = 0
    invalidInvoices = 0

# indices of various columns asked
# for validation in the problem statement
    idxAmnt = cols.index('Amt in loc.cur.')
    idxVendorCode = cols.index('Vendor Code')
    idxDate = cols.index('Pstng Date')
    idxInvoice = cols.index('Invoice Numbers')

# today date for validation of future dated invoices
    today = date.today()
    
    invoice = defaultdict(int)  # dictionary for checking multiple invoice numbers
    vendor = set()              # set, for storing unique vendors

    for  i in rows[1:]:

# incrementing invoice number in the dictionary
        invoice[i[idxInvoice]] += 1

# incrementing the number of invoices
        numInvoices += 1

# validation statements
        if chng(i[idxDate]) > today:      # for future dated invoices
            invalidInvoices += 1
        elif i[idxVendorCode] == "":      # if no Vendor assigned
            invalidInvoices += 1
        elif invoice[i[idxInvoice]] > 1:  # if duplicates
            continue                      # continue since duplicates number added later
        else:
            totSum += i[idxAmnt]          # total Amount
            vendor.add(i[idxVendorCode])  # adding vendor to the set

# for adding duplicates number ie, number of invoice numbers > 1
    for i in invoice:
        if invoice[i] > 1:
            invalidInvoices += invoice[i]

# returning the info to be displayed in dictionary format
# the dictionary is converted to JSON format so that can be sent to the server
    return jsonify({'numInvoices':numInvoices,
            'totSum':totSum,
            'numVendor':len(list(vendor)),
            'invalidInvoices':invalidInvoices
            })

# route for deploying. From here the website starts
@app.route('/')
def index():
    return app.send_static_file('index.html')

# error handling moves the user back to the main page
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=False)