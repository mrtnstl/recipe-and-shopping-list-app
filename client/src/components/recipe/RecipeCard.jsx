const RecipeCard = ({ id, title, description, minutesNeeded, navigate }) => {
    return (
        <div className='flex flex-col border-2 shadow-[4px_4px_0_black] p-2 bg-customYellow text-customGray w-[300px]'>
            <h3 className='text-lg font-bold hover:cursor-pointer hover:underline'
                onClick={() => { navigate(`/recipe/${id}`) }}>{title}</h3>
            <p className=' grow-1'>{description}</p>
            <p className='self-end'>Ready in {minutesNeeded} minutes</p>
        </div>
    )
}

export default RecipeCard;