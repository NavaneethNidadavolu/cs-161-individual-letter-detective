"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faDonate, faCode, faPalette, faCodeBranch, faFileContract, faShieldAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';

export default function Footer() {

    return (
        <footer className='mb-8 text-[var(--sub-color)]'>
            <div className="flex flex-row justify-between text-sm">
                <div className="grid grid-col-3 grid-flow-row sm:grid sm:grid-flow-col gap-3">
                    <a href="https://github.com/navaneethnivol/pastepad" className="flex flex-row items-center hover:text-[var(--main-color)]">
                        <FontAwesomeIcon className="mr-2" icon={faCode}></FontAwesomeIcon>
                        Github
                    </a>
                </div>

                <div className="flex flex-col items-start sm:flex-row">
                    <a href="" className="flex flex-row items-center hover:text-[var(--main-color)]">
                        <FontAwesomeIcon className="mr-2" icon={faCodeBranch}></FontAwesomeIcon>
                        v1.0.0
                    </a>
                </div>
            </div>
        </footer>
    );
}