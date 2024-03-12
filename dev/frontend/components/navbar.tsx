"use client"

import Image from "next/image";
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import Logo from "@/static/logo.png";
import Link from "next/link";

export default function NavBar() {

    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            console.log(credentialResponse);
            if (credentialResponse.credential) {
                const decodedToken = jwtDecode(credentialResponse.credential);
                console.log(decodedToken);
            }
        },
        onError: () => {
            console.log('Login Failed');
            // Handle error
        },
    });

    return (
        <header>
            <div className='flex flex-row items-center justify-between'>
                <Link href="/">
                    <Image src={Logo} alt="NumRecall Logo" height={40} ></Image>
                </Link>
            </div>
        </header>
    );
}
