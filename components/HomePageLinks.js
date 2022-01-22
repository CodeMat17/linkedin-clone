function HomePageLinks({ Icon, text }) {
    return (
        <div
            className="flex items-center justify-between 
            p-4 hover:shadow-xl hover:shadow-gray-400 cursor-pointer rounded-lg
            text-black bg-white max-w-lg mx-auto">
            <h3 className="text-xl">
                {text}
            </h3>
            <Icon className="text-gray-700" />            
        </div>
    )
}

export default HomePageLinks
