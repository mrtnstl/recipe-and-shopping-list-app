import { useState } from "react";
import { SearchIcon } from "../../assets/icons/SVGIcons";

const SearchBar = ({ submitHandler, action }) => {
    const [keyword, setKeyword] = useState("");
    return (
        <form onSubmit={e => {
            e.preventDefault();
            action === "simpleSearch" && submitHandler(keyword);
        }} className='p-2 my-2'>
            <span className="border-2 shadow-[2px_2px_0_black] p-2 rounded-xl bg-customBeige">
                <label htmlFor="searchRecipe" className='mr-2' onClick={() => {
                    action === "simpleSearch" && submitHandler(keyword)
                    action === "redirectAndSearch" && submitHandler(`recipes?keyword=${keyword}`)
                }}>
                    <SearchIcon />
                </label>
                <input name="searchRecipe" id="searchRecipe" placeholder="Search For Your Fave" type="text"
                    onChange={e => setKeyword(e.target.value)}
                    className="font-bold"
                />
            </span>
        </form>
    )
}

export default SearchBar;