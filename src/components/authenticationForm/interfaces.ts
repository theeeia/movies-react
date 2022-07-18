export interface Checkbox {
    label: string,
    name: string,
    type: string,
}

export interface Input {
    label: string,
    name: string,
    type: string,
    placeholder: string,
    showIcon?: string,
    icon?: React.ReactNode,
    handleIconClick?: ()=>void,
    required: boolean

}