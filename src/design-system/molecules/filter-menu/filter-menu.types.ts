export type FilterMenuProps = {
    list: Obj[];
    selectedValue: string;
    onGetValue: (value: string) => void;
}

type Obj = {
    label: string,
    value: string,
    type: 'modal' | 'dropdown';
    subMenu?: subMenuList[];
}

type subMenuList = {
    label: string;
    value: string;
}