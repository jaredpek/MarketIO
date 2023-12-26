import Select from "react-select";

export interface Option {
    value: any,
    label: any,
}

export default function Selector({
    options=[], isClearable=false, isMulti=false, className="", value, onChange
}: {
    options?: Option[],
    isClearable?: boolean,
    isMulti?: boolean,
    className?: string,
    value: any,
    onChange: (data: any) => void
}) {
    return (
        <div className={`pl-1.5 gray-border rounded ${className}`}>
            <Select
                isSearchable
                options={options}
                isMulti={isMulti}
                closeMenuOnSelect={!isMulti}
                isClearable={isClearable}
                styles={{
                    control: (base) => {
                        Object.assign(base, {
                            border: 0,
                            borderRadius: 6,
                            boxShadow: "none",
                            minHeight: 42,
                        })
                        return base;
                    }
                }}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
