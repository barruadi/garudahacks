import { useState } from "react";
import { useSearchStore } from "@/store/searchStore";
import { 
	User
} from "lucide-react";

export default function Header () {
    
    const [search, setSearch] = useState("");
	const setSearchValue = useSearchStore((state) => state.setSearchValue);

	// TODO: api call for filter
	const handleSearch = async () => {
		setSearchValue(search);
	};

    return (
        <div className="w-full">
			<div className="absolute top-0 left-0 right-0 z-50 bg-transparent p-4 flex items-center gap-2">
			{/* Input */}
			<input
				type="text"
				placeholder="Search..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="flex-grow p-2 border text-black bg-white border-gray-300 rounded-md focus:outline-none focus:ring"
			/>

			{/* Search button on the right */}
			<button
				onClick={handleSearch}
				className="p-2 border text-black bg-white border-gray-300 rounded-md focus:outline-none focus:ring"
			>
				<User size={24} strokeWidth={1.5} />
			</button>
			</div>
        </div>
    )
}