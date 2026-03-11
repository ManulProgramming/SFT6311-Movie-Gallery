from fastapi import FastAPI, Body
from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import pandas as pd
from rapidfuzz import process, fuzz
from json import loads
from pydantic import BaseModel

class Movie(BaseModel):
    index: int | None = -1
    Release_Date: str | None = ""
    Title: str
    Overview: str | None = ""
    Popularity: int | None = 0
    Vote_Count: int | None = 0
    Vote_Average: float | None = 0
    Original_Language: str | None = ""
    Genre: str | None = ""
    Poster_Url: str | None = ""
app = FastAPI()

df = pd.read_csv("9000plus.csv",encoding='utf-8')
df['Title'].dropna(inplace=True)
df['Overview'].fillna("N/A",inplace=True)
df['Popularity'].fillna(0,inplace=True)
df['Vote_Count'].fillna(0,inplace=True)
df['Vote_Average'].fillna(0,inplace=True)
df['Original_Language'].fillna('N/A',inplace=True)
df['Genre'].fillna('N/A',inplace=True)
df['Poster_Url'].fillna('N/A',inplace=True)
df['Poster_Url']=df['Poster_Url'].str.replace('https://image.tmdb.org/t/p/original/','https://image.tmdb.org/t/p/w342/')
print(df.index)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/movies")
async def get_movies(s: str = "", i: int = -1, p: int = 0):
    if p>984:
        p=984
    elif p<0:
        p=0
    if i == -1:
        if s:
            results = process.extract(s,df['Title'],scorer=fuzz.WRatio,limit=None)
            indexes=[i for index, (_, _, i) in enumerate(results[p:p+10]) if index<10 or i<len(df)]
            res = df.iloc[indexes].reset_index()
            return loads(res.to_json(orient='records'))
        else:
            res=df.sort_values(by=["Popularity"],ascending=False)
            return loads(pd.concat([df[9837:],res.iloc[p:p+10]]).reset_index().to_json(orient='records'))
    else:
        return loads(pd.DataFrame([df.iloc[i]]).reset_index().to_json(orient='records'))

@app.post('/movies')
async def add_movie(movie: Movie):
    global df
    movie_data = movie.model_dump()
    del movie_data['index']
    df = pd.concat([df,pd.DataFrame([movie_data])], ignore_index=True)
    df.to_csv("9000plus.csv",encoding='utf-8',index=False)
    res = df.sort_values(by=["Popularity"], ascending=False)
    return loads(pd.concat([df[9837:], res.iloc[:10]]).reset_index().to_json(orient='records'))

@app.patch('/movies')
async def edit_movie(movie: Movie):
    global df
    movie_data = movie.model_dump()
    row = df.iloc[movie_data.get("index")]
    if row['Release_Date']!=movie_data.get("Release_Date"):
        row['Release_Date']=movie_data.get("Release_Date")
    if row['Title']!=movie_data.get("Title"):
        row['Title']=movie_data.get("Title")
    if row['Overview']!=movie_data.get("Overview"):
        row['Overview']=movie_data.get("Overview")
    if row['Original_Language']!=movie_data.get("Original_Language"):
        row['Original_Language']=movie_data.get("Original_Language")
    if row['Genre']!=movie_data.get("Genre"):
        row['Genre']=movie_data.get("Genre")
    if row['Poster_Url']!=movie_data.get("Poster_Url"):
        row['Poster_Url']=movie_data.get("Poster_Url")
    df.iloc[movie_data.get("index")] = row
    df.to_csv("9000plus.csv", encoding='utf-8', index=False)
    return loads(pd.DataFrame([row]).reset_index().to_json(orient='records'))

if __name__=='__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)