import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"

export default function BackButton() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(-1)
    }

    return (
        <button className="back-btn" onClick={handleClick}>
            <FaArrowLeft />
        </button>
    )
}