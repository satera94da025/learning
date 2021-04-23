import React, { useRef, useState} from 'react';

const ControlledInput = () => {

    const [value, SetValue] = useState('')
    const ref = useRef<HTMLInputElement >(null)

    const setValue = () => {
        const el = ref.current as HTMLInputElement
        SetValue(el.value)
    }

    return <>
        <input  ref={ref}/>
        <button onClick={setValue}> SET</button>
        <span>{value}</span>
    </>
}
export default ControlledInput