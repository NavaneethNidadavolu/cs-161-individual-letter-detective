

export default function Play() {
    return (

        <div className="flex flex-col h-screen items-center justify-center">
            <div className="bg-[#D9D9D9] rounded-[10px] sm:w-2/4">
                <div className="flex flex-row justify-around rounded-[10px] p-3 bg-[var(--sub-alt-color)] text-[var(--sub-color)]">
                    <div className="flex flex-row">
                        <div>Leaderboard</div>
                    </div>
                </div>
            </div>
            <div className="mt-16 border rounded-[10px] w-11/12 h-1/3 border-black overflow-auto">
                <div className="w-5/6 h-20 rounded bg-white my-4 m-auto">

                </div>
                <div className="w-5/6 h-20 rounded bg-white my-4 m-auto">

                </div>
                <div className="w-5/6 h-20 rounded bg-white my-4 m-auto">

                </div>
                <div className="w-5/6 h-20 rounded bg-white my-4 m-auto">

                </div>
            </div>
        </div>
    );
}