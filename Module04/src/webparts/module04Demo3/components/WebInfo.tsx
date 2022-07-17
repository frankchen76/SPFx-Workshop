import * as React from "react";
import { useEffect, useState } from "react";
import { IWebService } from "../../../services/web/IWebService";
import { withServiceScope } from "../../../services/withServiceScope";

export interface IWebInfoProps {
    service: IWebService;
}
const WebInfo = (props: IWebInfoProps) => {
    const [webTitle, setWebTitle] = useState("");
    useEffect(() => {
        //
        const fetchData = async () => {
            const result = await props.service.getWebBySPORest();
            console.log(result);
            setWebTitle(result["Title"]);
        };

        fetchData();
    }, []);

    return (
        <div>Web Title: <b>{webTitle}</b></div>
    );
};
export default withServiceScope(WebInfo);
