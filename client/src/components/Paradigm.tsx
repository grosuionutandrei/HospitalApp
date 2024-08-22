
import backgroundImage from '../resources/medical.jpg';


export function Paradigm(){
    return (
    <div
        className="hero">
        <img src={backgroundImage} />
        <div className="hero-overlay bg-opacity-0"></div>
        <div className="hero-content text-center">
            <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold title-color ">Empower Your Healthcare with Precision</h1>
                <h2 className="mb-5 text-3xl font-bold title-color">Streamline Patient Management and Disease Tracking</h2>
                <p className="mb-5 hero-manifest">
                    " Our intuitive platform revolutionizes the way you manage patient data, diagnoses, and disease
                    associations. With real-time insights, comprehensive records, and advanced analytics, you can
                    focus on what truly matters—providing exceptional care. Simplify your workflow and enhance
                patient outcomes with the ultimate tool for modern healthcare professionals. "
                </p>
            </div>
        </div>
    </div>
)

}