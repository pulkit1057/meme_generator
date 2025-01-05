import React from "react"


export default function Main() {

    const [allMemes,setAllMemes] = React.useState([])

    const [meme, setMeme] = React.useState({
        imageUrl: "http://i.imgflip.com/1bij.jpg",
        topText: "One does not simply",
        bottomText: "Walk into Mordor"
    })

    // React.useEffect(() => {
    //     fetch("https://api.imgflip.com/get_memes")
    //         .then(res => res.json())
    //         .then(data => console.log(data.data.memes))
    // },[count%10])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    },[])



    function handleChange(event) {
        const { value, name } = event.currentTarget

        setMeme(function (prevMeme) {
            return { ...prevMeme, [name]: value, }
        })
    }

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)

        setMeme(prevMeme => ({...prevMeme,imageUrl:allMemes[randomNumber].url}))
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </label>
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}