import { IconButton, Label, Stack, TextField } from "office-ui-fabric-react";
import * as React from "react";
import { useState } from "react";
import styles from "./Header.module.scss";

export interface IHeaderProps {
    text: string;
};
export const Header = (props: IHeaderProps) => {
    const [searchKeyword, setSearchKeyword] = useState<string>();
    const _onSearchHandler = () => {
        window.location.href = "https://www.bing.com/search?q=" + searchKeyword;

    }
    const _onKeywordChanged = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        setSearchKeyword(newValue);
    }
    return (
        <Stack>
            <Stack tokens={{ childrenGap: 2 }} horizontal>
                <Label>{props.text}</Label>
                <TextField placeholder="Please enter search keyword here"
                    width={300}
                    onChange={_onKeywordChanged} />
                <IconButton iconProps={{ iconName: 'Search' }}
                    title="Search"
                    ariaLabel="Search"
                    onClick={_onSearchHandler} />
            </Stack>
        </Stack>

    );
};