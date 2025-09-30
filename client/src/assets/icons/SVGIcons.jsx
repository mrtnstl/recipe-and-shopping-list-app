export const MenuIcon = ({ onClick }) => {
    return (
        <svg onClick={onClick} className="menuIcon" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="menuFragment fill-customGray" d="M15 15H14.9756L0 0.0244141V0H15V15Z" />
            <path className="menuFragment fill-customGray" d="M30 15H29.9756L15 0.0244141V0H30V15Z" />
            <path className="menuFragment fill-customGray" d="M45 15H44.9756L30 0.0244141V0H45V15Z" />
            <path className="menuFragment fill-customGray" d="M15 30H14.9756L0 15.0244V15H15V30Z" />
            <path className="menuFragment fill-customGray" d="M30 30H29.9756L15 15.0244V15H30V30Z" />
            <path className="menuFragment fill-customGray" d="M45 30H44.9756L30 15.0244V15H45V30Z" />
            <path className="menuFragment fill-customGray" d="M15 45H14.9756L0 30.0244V30H15V45Z" />
            <path className="menuFragment fill-customGray" d="M30 45H29.9756L15 30.0244V30H30V45Z" />
            <path className="menuFragment fill-customGray" d="M45 45H44.9756L30 30.0244V30H45V45Z" />
        </svg>
    )
}
export const SearchIcon = () => {
    return (
        <svg className="w-[20px] inline" width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="fill-customGray" d="M13.5 0C20.9558 0 27 6.04416 27 13.5C27 16.1827 26.2164 18.6818 24.8672 20.7832L31.9463 28.6484L26 34L18.7471 25.9414C17.1339 26.6226 15.3611 27 13.5 27C6.04416 27 0 20.9558 0 13.5C0 6.04416 6.04416 0 13.5 0ZM14 7C10.134 7 7 10.134 7 14C7 17.866 10.134 21 14 21C17.866 21 21 17.866 21 14C21 10.134 17.866 7 14 7Z" />
        </svg>
    )
}