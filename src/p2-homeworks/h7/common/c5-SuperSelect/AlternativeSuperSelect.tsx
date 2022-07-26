import React, {ChangeEvent, useState} from 'react'
import {
    SOption,
    SSuperOption,
    SSuperOptionsList,
    SSuperSelectInput, SSuperSelectInputIcon,
    SSuperSelectInputWrapper,
    SSuperSelectWrapper
} from "./styled";
import ExpandMoreIcon from "../../../../assets/icons/ExpandMoreIcon";

type TAlternativeSuperSelect = {
    options: Array<string>
    onChangeOption: (option: string) => void
    value: string
}

function AlternativeSuperSelect(props: TAlternativeSuperSelect) {

    const [opened, setOpened] = useState(false)
    const [hoveredElement, setHoveredElement] = useState(props.value)

    const onKeyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        for (let i = 0; i < props.options.length; i++) {
            if (e.key === 'ArrowDown' && props.options[i] === hoveredElement) {
                let verify = props.options[i + 1] || props.options[0]
                props.onChangeOption(verify)
                setHoveredElement(verify)
            }
            if (e.key === 'ArrowUp' && props.options[i] === hoveredElement) {
                let verify = props.options[i - 1] || props.options[props.options.length - 1]
                props.onChangeOption(verify)
                setHoveredElement(verify)
            }
            if (e.key === 'Enter' || e.key === 'Escape') {
                setOpened(false)
            }
        }
    }

    const mappedOptions: any[] = props.options ? props.options.map((el, i) => (
        <SSuperOption
            onClick={() => onClickHandler(el)}
            onMouseEnter={() => setHoveredElement(el)}
            isHovered={hoveredElement === el}
            key={i}
        >
            {el}
        </SSuperOption>)
    ) : [] // map

    const onClickHandler = (el: any) => {
        props.onChangeOption(el)
        setOpened(false)
    }

    const arrowPreventDefault = () => {
        window.addEventListener("keydown", (event) => {
            (event.key === "ArrowUp" || event.key === "ArrowDown") && event.preventDefault()
            //для запрета глобал скролла стрелками
        });

    };

    return (
        <SSuperSelectWrapper
            onFocus={arrowPreventDefault}
            onKeyUp={onKeyHandler}
            tabIndex={0}
            onBlur={() => setOpened(false)}
        >
            <SSuperSelectInputWrapper
                onClick={() => setOpened(!opened)}
            >
                <SSuperSelectInput>
                    {props.value}
                </SSuperSelectInput>
                <SSuperSelectInputIcon isOpen={opened}>
                    <ExpandMoreIcon />
                </SSuperSelectInputIcon>
            </SSuperSelectInputWrapper>
            {opened && (
                <SSuperOptionsList>
                    {mappedOptions || 'empty'}
                </SSuperOptionsList>
            )}
        </SSuperSelectWrapper>
    )
}

export default AlternativeSuperSelect
