export type DropdownProps = {
    list: Items[];
    selectedValue?: string;
    onGetValue: (value: string) => void;
    label?: string;
    placeholder: string;
}

export type Items = {
    title: string;
    value: string;
}