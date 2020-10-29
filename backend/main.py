from flask import Flask, jsonify, request
from flask_cors import CORS
from whoosh.qparser import QueryParser, MultifieldParser
from whoosh.index import open_dir

app = Flask(__name__)
CORS(app)

# put here to avoid LockError
ix = open_dir("indexdir")
writer = ix.writer()

@app.route('/paper', methods = ['POST'])
def search():
  info = request.get_json()
  q = info['query']
  output = []
  title = ""
  results = []
  with ix.searcher() as searcher:
    query = MultifieldParser(["title", "abstract"], ix.schema).parse(f"{q}")
    results = searcher.search(query, limit=None)
    for result in results:
      new = { "title": result["title"], "abstract": result["abstract"] }
      output.append(new)
    return jsonify(output)      

if __name__ == '__main__':
    app.run(debug = True)

# flask_cors.CORS(app, expose_headers='Authorization')