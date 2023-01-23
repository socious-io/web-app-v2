import { ChangeEvent } from "react";

export type RadioProps = {
    label: string;
    name: string;
    id: string;
    checked?: boolean;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}