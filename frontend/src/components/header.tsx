import { useState } from "react";
import { useSearchStore } from "@/store/searchStore";

export default function Header () {
    const [search, setSearch] = useState("");
	const setSearchValue = useSearchStore((state) => state.setSearchValue);

	// TODO: api call for filter
	const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearch(value);
		setSearchValue(value);
	};



    return (
        <div className="w-full">
			<div className="absolute top-0 left-0 right-0 z-50 bg-transparent p-4 flex items-center gap-2">
			{/* Input */}
			<input
				type="text"
				placeholder="Search..."
				value={search}
				onChange={handleSearch}
				className="flex-grow p-2 border text-black bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.05)] rounded-md focus:outline-none focus:ring"
			/>
			</div>
        </div>
    )
}