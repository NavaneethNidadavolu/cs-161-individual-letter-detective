"use client"

import { useEffect } from "react";


export default function Track({ context }: { context: any }) {

    useEffect(() => {

        if (sessionStorage.getItem("visited") == "true") {
            return;
        }

        sessionStorage.setItem("visited", "true");

        let title = "New Visitor";

        if (context.searchParams.source != undefined) {
            title = "New Visitor [" + context.searchParams.source + "]";
        }

        fetch(process.env.NEXT_PUBLIC_TRACK_API_URL + "/notify", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "application_name": 'Numrecall',
                "title": title,
                "message": "Someone opened numrecall website!",
                "notification_channel_id": "1226322131600674898"
            }),
            cache: 'no-store'
        });

    }, []);

    return null;
}