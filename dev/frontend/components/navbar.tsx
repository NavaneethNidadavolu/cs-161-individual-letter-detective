"use client"

import Image from "next/image";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { faInfo, faCrown, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from "@/static/logo.png";
import Link from "next/link";
import { useEffect, useState } from "react";


interface Login {
    aud: string
    azp: string
    email: string
    email_verified: boolean
    exp: number
    family_name: string
    given_name: string
    hd: string
    iat: string
    iss: string
    jti: string
    locale: string
    name: string
    nbf: number
    picture: string
    sub: string
}

export default function NavBar() {

    const [login, setLogin] = useState<Login>();

    useEffect(() => {
        let login = localStorage.getItem("login");
        if (login) {
            setLogin(JSON.parse(login));
        }
    }, []);

    return (
        <header>
            <div className='flex flex-row items-center justify-between'>
                <div className="flex flex-row">
                    <Link href="/">
                        <Image src={Logo} alt="NumRecall Logo" height={40} ></Image>
                    </Link>
                    <Link href="/leaderboard">
                        <div className='mx-2 p-2'>
                            <FontAwesomeIcon icon={faCrown} className='text-[var(--sub-color)] hover:text-[var(--text-color)]'></FontAwesomeIcon>
                        </div>
                    </Link>
                    <Link href="/info">
                        <div className='mx-2 p-2'>
                            <FontAwesomeIcon icon={faInfo} className='text-[var(--sub-color)] hover:text-[var(--text-color)]'></FontAwesomeIcon>
                        </div>
                    </Link>
                </div>
                {
                    login && Object.keys(login).length > 0
                        ? <div className="flex flex-row">
                            <div className="flex flex-row items-center bg-[#D3D3D3] p-1.5 rounded-full mr-3">
                                <img src={login.picture} alt="User image" className="w-8 h-8 rounded-full mr-3" />
                                <p>{login.name}</p>
                                <button className="mx-2" onClick={() => {
                                    setLogin(undefined);
                                    localStorage.removeItem("login");
                                }}>
                                    <div className=''>
                                        <FontAwesomeIcon icon={faSignOut} className='text-[var(--sub-color)] hover:text-[var(--text-color)]'></FontAwesomeIcon>
                                    </div>
                                </button>
                            </div>
                        </div>
                        : <GoogleLogin shape="pill" type="icon" onSuccess={credentialResponse => {
                            if (credentialResponse.credential) {
                                const decodedToken: Login = jwtDecode(credentialResponse.credential);
                                localStorage.setItem("login", JSON.stringify(decodedToken));
                                localStorage.setItem("auth-token", credentialResponse.credential);
                                setLogin(decodedToken);
                            }
                        }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                }
            </div>
        </header>
    );
}