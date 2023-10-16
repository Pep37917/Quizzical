import React from "react"
import './Start.css'

export default function Start(props) {
    return (
        <div className="bg-start">
            <div className="mid">
                <h2 className="title"><span className="logo-q">Q</span>uizzical</h2>
                <p className="start-desc">Test your knowledge</p>
                <button className="start-btn" onClick={() => props.setStartQuiz(true)}>start</button>
            </div>
            <div className="start-vectors">
                <svg className="s-vec-3" xmlns="http://www.w3.org/2000/svg" width="229" height="105" viewBox="0 0 229 105" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M63.4095 45.3947C35.1213 14.8508 -2.68208 -14.2184 1.17277 -55.6933C5.43944 -101.599 39.8541 -141.359 82.4192 -159.133C122.797 -175.994 170.035 -166.256 205.822 -141.149C235.947 -120.014 236.823 -79.8756 246.141 -44.271C256.17 -5.94922 282.521 34.8106 260.501 67.7792C237.539 102.159 188.991 107.432 147.931 102.768C112.318 98.7234 87.7505 71.6768 63.4095 45.3947Z" fill="#FFFAD1"/>
                </svg>
                <svg className="s-vec-4" xmlns="http://www.w3.org/2000/svg" width="117" height="98" viewBox="0 0 117 98" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M-36.5519 4.90596C4.96136 1.77498 51.2425 -9.72149 81.3059 19.1094C114.581 51.0203 124.282 102.703 111.701 147.081C99.7675 189.18 62.7448 220.092 20.8208 232.476C-14.4719 242.902 -46.4332 218.605 -80.1007 203.738C-116.338 187.737 -164.641 182.993 -176.741 145.239C-189.358 105.868 -163.269 64.5881 -134.064 35.3528C-108.733 9.99541 -72.2727 7.60006 -36.5519 4.90596Z" fill="#DEEBF8"/>
                </svg>
            </div>
        </div>
    )
}