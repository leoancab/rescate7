import Tour1 from "./Tour1"
import Tour2 from "./Tour2"
import Tour3 from "./Tour3"
import Tour4 from "./Tour4"

export default function Tour() {
    return (
        <div className="slider">

            <div className="slide"><Tour1 /></div>
            <div className="slide"><Tour2 /></div>
            <div className="slide"><Tour3 /></div>
            <div className="slide"><Tour4 /></div>

        </div>

    )
}