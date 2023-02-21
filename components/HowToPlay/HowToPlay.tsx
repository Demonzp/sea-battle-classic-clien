import { useState } from "react";

const slides = [
    'slide1',
    'slide2',
    'slide3',
    'slide4'
]

const HowToPlay = ()=>{
    const [slideIdx, setSlideIdx] = useState(0);

    const onNext = ()=>{
        if(slideIdx<slides.length-1){
            console.log('onNext');
            setSlideIdx(prev=>{return prev+=1});
        }
    };

    const onPrev = ()=>{
        if(slideIdx>0){
            setSlideIdx(prev=>{return prev-=1});
        }
    };

    return(
        <>
            <div>
                <img src={`./assets/${slides[slideIdx]}.jpg`} alt={slides[slideIdx]}/>
                <div>
                    {slideIdx>0&&<button onClick={onPrev}>Prev</button>}
                    {slideIdx<slides.length-1&&<button onClick={onNext}>Next</button>}
                </div>
            </div>
        </>
    );
}

export default HowToPlay;