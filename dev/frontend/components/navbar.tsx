"use client"

import Image from "next/image";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

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
                <Link href="/">
                    <Image src={Logo} alt="NumRecall Logo" height={40} ></Image>
                </Link>
                {
                    login && Object.keys(login).length > 0
                        ? <div className="flex flex-row">
                            <div className="flex flex-row items-center bg-[#D3D3D3] p-1.5 rounded-full mr-3">
                                <img src={login.picture} alt="User image" className="w-8 h-8 rounded-full mr-3" />
                                <p>{login.name}</p>
                            </div>
                            <button onClick={() => {
                                setLogin(undefined);
                                localStorage.removeItem("login");
                            }}>X</button>
                        </div>
                        : <GoogleLogin onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                            if (credentialResponse.credential) {
                                const decodedToken: Login = jwtDecode(credentialResponse.credential);
                                console.log(decodedToken);
                                localStorage.setItem("login", JSON.stringify(decodedToken));
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