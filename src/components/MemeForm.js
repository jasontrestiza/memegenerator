import React from "react"
// import MemesData from "./MemesData"


export default function MemeForm(){

    // const [memeImage,setMemeImage] = React.useState("")

    const [meme,setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImg:  "http://i.imgflip.com/1bij.jpg" 
    })

    const [allMeme,setAllMeme] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMeme(data.data.memes))
    })
  

    function getMemeImage(){

        // const getMemes = allMeme
        const generateNumber = Math.floor(Math.random() * allMeme.length)
        const getUrl = allMeme[generateNumber].url
        // console.log(getUrl)
    
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImg: getUrl
        }))
    }

    function handleChange(event){
        const {name,value} = event.target

        setMeme(prevMemeText => ({
            ...prevMemeText,
            [name]: value
        }))
    }
    
    
    
    return(
        <div className="meme-form">
            <div className="form">
                <input className="form-input" type="text"  name="topText" placeholder="Input top text." value={meme.topText} onChange={handleChange}></input>
                <input className="form-input" type="text"  name="bottomText" placeholder="Input bottom text" value={meme.bottomText} onChange={handleChange}></input>
                <br></br><button className="form-button" type="submit" onClick={getMemeImage}>Get a new meme image 🖼 </button>
            </div>
            <div className="meme">
                <img src={meme.randomImg} className="meme-img"></img>
                <h2 className="meme-text top" > {meme.topText} </h2>
                <h2 className="meme-text bottom"> {meme.bottomText}</h2>
            </div>
        </div>
    )
}