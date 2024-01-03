import React, {ReactNode} from "react";

export default function Html({children}:{children: ReactNode}){
    return(
        <html lang="ko">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>Hi~</title>
        </head>
        <body
            style={{
                fontFamily: ` -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
            }}
        >
        <div id="root">{children}</div>
        </body>
        </html>
    )
}