import React, {useState} from 'react'
import Greeting from './Greeting'
import {UserType} from "./HW3";

type GreetingContainerPropsType = {
    users: Array<UserType>
    addUserCallback: (name: string) => void
}

const GreetingContainer: React.FC<GreetingContainerPropsType> = ({users, addUserCallback}) => {
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string>('')

    const setNameCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
        setError('')
    }
    const addUser = () => {
        if(name.length < 1) {
            setError('PLEASE enter your name!!!')
        } else if((/^[a-яA-Я\-]+$/).test(name)){
            addUserCallback(name)
            alert("Hello " + name + "! Please go away!")
            setName('')
        } else {
            setError('Very unusual and interesting name, but I can\'t approve it')

        }
    }
    const totalUsers = users.length

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            error={error}
            totalUsers={totalUsers}
        />
    )
}

export default GreetingContainer
