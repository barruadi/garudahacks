interface PopUpCardProps {
    userPhoto: string,
    title: string,
    desc: string,
}

export function PopUpCard({
    userPhoto,
    title,
    desc,
}: PopUpCardProps) {
    return (
        <div className="">
            <img src={userPhoto} alt={userPhoto} className="w-full h-full object-cover"/>
            <h2 className="">{title}</h2>
            <h3 className="">{desc}</h3>
        </div>
    )
}