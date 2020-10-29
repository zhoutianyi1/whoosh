import os
from whoosh.index import create_in, open_dir
from whoosh.fields import Schema, TEXT, ID
import sys
import json
from tqdm import tqdm
from whoosh.qparser import QueryParser, MultifieldParser

 
def createSearchableData():   
    # Create Schema
    schema = Schema(title=TEXT(stored=True), abstract=TEXT(stored=True))
    # if not os.path.exists("indexdir"):
    #     os.mkdir("indexdir")
 
    # Idx writer to write schema
    ix = create_in("indexdir",schema)
    writer = ix.writer(multisegment=True)
 
    # add document
    with open('new.json', 'r') as file:
        data = json.load(file)
        for i, research in tqdm(enumerate(data)):
            if i > 500000:
                break
            writer.add_document(title=research['title'], abstract=research['abstract'])
        writer.commit()
        print('done')



createSearchableData()

