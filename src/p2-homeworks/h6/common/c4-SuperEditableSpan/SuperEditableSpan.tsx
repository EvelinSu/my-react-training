import React, {DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState, ChangeEvent} from 'react'
import {SSuperEditableSpan, SSuperEditableSpanWrapper} from "./styled";
import SuperInputText from "../../../h4/common/c1-SuperInputText/SuperInputText";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperEditableSpanType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    spanProps?: DefaultSpanPropsType // пропсы для спана
}

const SuperEditableSpan: React.FC<SuperEditableSpanType> = (
    {
        autoFocus, // игнорировать изменение этого пропса
        onBlur,
        onEnter,
        spanProps,
        onChangeText,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

    const onEnterCallback = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            onEnter && onEnter()
        }
    }
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false) // выключить editMode при нажатии за пределами инпута
        onBlur && onBlur(e)
    }
    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true) // включить editMode при двойном клике
        onDoubleClick && onDoubleClick(e)
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeText(e.currentTarget.value)
    }

    return (
        <SSuperEditableSpanWrapper>
            {editMode
                ? (
                    <SuperInputText
                        autoFocus // пропсу с булевым значением не обязательно указывать true
                        onBlur={onBlurCallback}
                        onChange={onChangeHandler}
                        onKeyPress={onEnterCallback}
                        {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                    />
                ) : (
                    <SSuperEditableSpan
                        onDoubleClick={onDoubleClickCallBack}
                    >
                        {/*если нет захардкодженного текста для спана, то значение инпута*/}
                        {children ? <span style={{opacity: 0.3}}>{children}</span> : restProps.value}
                    </SSuperEditableSpan>
                )
            }
        </SSuperEditableSpanWrapper>
    )
}

export default SuperEditableSpan
