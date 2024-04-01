import Footer from "@/components/footer";

async function getLeaderboardData() {
    const response = await fetch(`${process.env.API_ENDPOINT}/leaderboard`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache'
    });

    return response
}

interface LeaderboardData {
    leaderboard: [{
        user_pic: string,
        username: string,
        score: number
    }]
}

export default async function Leaderboard() {

    const data: LeaderboardData = await (await getLeaderboardData()).json()

    return (
        <div className="flex flex-col justify-between items-center mt-16">
            <div className="bg-[#D9D9D9] rounded-[10px]">
                <div className="flex flex-row justify-around rounded-[10px] p-3 bg-[var(--sub-alt-color)] text-[var(--sub-color)]">
                    <div className="flex flex-row">
                        <div>Leaderboard</div>
                    </div>
                </div>
            </div>
            <div className="border max-h-96 mt-16 rounded-[10px] border-black overflow-auto w-5/6 sm:w-4/12">
                <div className="w-11/12 rounded-[10px] bg-white my-4 m-auto p-2">
                    <div className="flex flex-row justify-between items-center p-2">
                        <div>Rank</div>
                        <div>Name</div>
                        <div>Score</div>
                    </div>
                </div>
                {data.leaderboard.length > 0
                    ? data.leaderboard.map((item: any, index: number) => {
                        return (
                            <div key={index} className="w-11/12 rounded-[10px] bg-white my-4 m-auto p-2">
                                <div className="flex flex-row justify-between items-center p-4">
                                    <div>{index + 1}</div>
                                    <div className="flex flex-row justify-center items-center">
                                        <img src={item.user_pic} alt="User image" className="w-8 h-8 rounded-full mr-3" />
                                        <div>{item.user_name}</div>
                                    </div>
                                    <div>{item.score}</div>
                                </div>
                            </div>
                        );
                    })
                    : <div className="w-5/6 rounded-[10px] bg-white my-4 m-auto">
                        <div className="flex flex-row justify-around items-center p-4">
                            <div>No Records Yet.</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}