import React from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

const Signup = () => {
    function Signup(props) {
        const [formState, setFormState] = useState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        });
        const [addUser] = useMutation(ADD_USER);

        const handleFormSubmit = async (event) => {
            event.preventDefault();
            const mutationResponse = await addUser({
                variables: {
                    email: formState.email,
                    password: formState.password,
                    firstName: formState.firstName,
                    lastName: formState.lastName,
                },
            });
            const token = mutationResponse.data.addUser.token;
            Auth.login(token);
        };

        const handleChange = (event) => {
            const { name, value } = event.target;
            setFormState({
                ...formState,
                [name]: value,
            });
        };
        return (
            <>
                Signup Page
            </>
        );
    };
}
export default Signup;
