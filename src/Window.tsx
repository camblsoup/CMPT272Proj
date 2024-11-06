import './css/Window.css'
import icon from './assets/map-icon.png'
import minimize from './assets/minimize.png'
import maximize from './assets/maximize.png'
import cross from './assets/cross.png'
import MapWindow from './Map'

// Window Element Specification
function Window() {

    // Html to return
    return (
        <>
            <div className={"window"}>
                <div className={"top-bar"}>
                    <div className={"title"}>
                        <img src={icon} alt={"map icon"}/>
                        <h1>Map</h1>
                    </div>
                    <div className={"window-buttons"}>
                        <div className={"window-size-buttons"}>
                            <button className={"window-button"}><img className={"window-button-icon"} src={minimize} alt={"minimize icon"}/></button>
                            <button className={"window-button"}><img className={"window-button-icon"} src={maximize} alt={"maximize icon"}/></button>
                        </div>
                        <button className={"window-button"}><img className={"window-button-icon"} src={cross} alt={"close icon"}/></button>
                    </div>
                </div>
                <div className={"body"}>
                    <MapWindow />
                </div>
                <div className={"info"}></div>
            </div>
        </>
    )
}

// Specifies a default function to return when called
export default Window