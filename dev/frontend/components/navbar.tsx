import Image from "next/image";

import Logo from "@/static/logo.png";

export default function NavBar() {
    return (
        <header>
            <div className='flex flex-row items-center justify-between'>
                <Image src={Logo} alt="NumRecall Logo" height={40} ></Image>
                <div>
                    <button>Login</button>
                </div>
            </div>
        </header>
    );
}
