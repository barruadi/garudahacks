import { useNavigate } from "react-router";

interface PopUpCardProps {
    id: number,
    userPhoto: string,
    title: string,
    desc: string,
    isProduct?: boolean
}

export function PopUpCard({
    id,
    userPhoto,
    title,
    desc,
    isProduct
}: PopUpCardProps) {
    const navigate = useNavigate()

    async function handleClick() {
        if (isProduct) {
            navigate("/local-products/" + id);
        }
        else {
            navigate("/sites/" + id);
        }
    }
    return (
        <div className="flex flex-col">
            <img src={userPhoto} alt={userPhoto + id} className="w-full h-full object-cover mb-4"/>
            <h2 className="mb-4 text-black font-bold text-[20px]">{title}</h2>
            <h3 className="mb-2 text-black text-[14px]">{desc}</h3>
            <button className="flex items-center mt-4 text-[#B78748] font-medium" onClick={handleClick}>
                See detail
                <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    )
}